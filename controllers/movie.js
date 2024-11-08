const Movie = require("../models/Movie");
const {errorHandler} = require("../auth");

module.exports.addMovie = (req, res) => {
	let newMovie = new Movie({
		title: req.body.title,
		director: req.body.director,
		year: req.body.year,
		description: req.body.description,
		genre: req.body.genre,
	});

	newMovie
		.save()
		.then((result) =>
			res.status(201).send(result)
		)
		.catch((error) => errorHandler(error, req, res));
};

module.exports.getAllMovies = (req, res) => {
	return Movie.find({})
		.then((result) => {
			if (result.length === 0) {
				return res.status(404).send({message: "No movies found"});
			}

			return res.status(200).send({movies: result});
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.getMovieById = (req, res) => {
	return Movie.findById(req.params.movieId)
		.then((movie) => {
			if (!movie) {
				return res.status(404).send({message: "Movie not found"});
			} else {
				return res.status(200).send(movie);
			}
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.updateMovie = (req, res) => {
	const {movieId} = req.params;
	const updateData = req.body;

	return Movie.findByIdAndUpdate(movieId, updateData, {new: true})
		.then((updatedMovie) => {
			if (!updatedMovie) {
				return res.status(404).send({message: "Movie not found"});
			} else {
				return res.status(200).send({
					message: "Movie updated successfully",
					updatedMovie: updatedMovie
				});
			}
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.deleteMovie = (req, res) => {
    const { movieId } = req.params;

    return Movie.findByIdAndDelete(movieId)
        .then((deletedMovie) => {
            if (!deletedMovie) {
                return res.status(404).send({ message: "Movie not found" });
            } else {
                return res.status(200).send({
                    message: "Movie deleted successfully"
                });
            }
        })
        .catch((error) => errorHandler(error, req, res));
};

module.exports.addMovieComment = (req, res) => {
    const { movieId } = req.params;
    const { comment } = req.body;

    const newComment = { 
    	userId: req.user._id,
    	comment,
    };

    Movie.findById(movieId)
        .then((movie) => {
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            movie.comments.push(newComment);

            return movie.save();
        })
        .then((updatedMovie) => res.status(200).send({
					message: "Comment added successfully",
					updatedMovie: updatedMovie
				}))
        .catch((error) => errorHandler(error, req, res));
};

module.exports.getMovieComments = (req, res) => {
    const { movieId } = req.params;

    Movie.findById(movieId)
        .then((movie) => {
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            res.status(200).send({
                comments: movie.comments,
            });
        })
        .catch((error) => errorHandler(error, req, res));
};