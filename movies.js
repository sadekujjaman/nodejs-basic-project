const express = require("express");
const router = express.Router();

const movies = require("./movies.json");
const fs = require("node:fs");

/**
movies: 
[
  {
    "id": number,
    "name": string,
    "genre": [string],
    "rating": number,
    "year": number,
    "language": string
  }
]
 */

// =============
// Task 1: Create a route to handle a GET request to fetch all movies and send the movies JSON array as a response.
// Note: Returns an empty array if movies not found.
// Write code here
router.get("/", (req, res) => {
  res.send("Dipto Moja");
});
router.get("/movies", (req, res) => {
  fs.readFile("movies.json", "utf8", (err, data) => {
    const movies = JSON.parse(data) || [];
    res.json(movies);
  });
});

// =============

// =============
// Task 2: Create a route that accepts a movie ID as a parameter and returns the details of the specific movie with that ID.
// Note: It should return a single json object if movies found, otherwise returns empty object.
// Write code here

router.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);

  if (isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  fs.readFile("movies.json", "utf8", (err, data) => {
    const movies = JSON.parse(data);
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  });
});

// =============

// =============
// Task 3: Create a route to handle a POST request to add a new movie to the "movies" array.
// Note:
// i) Validate Id and name fields - these must be unique. If a movie already exists with the provided id or name, then return "Movie with ${id}/${name} already exists."
// ii) Validate other fields, if a field not found or for invalid data, return "Invalid field - ${fieldName}"
// iii) Must have at least one genre.
// iv) Rating must be between 1 to 10(inclusive)
// v) Apply auto coercion for number fields(if possible). {"year": "2016"} should be converted to {"year": 2016} but {"year" : "abc"} should return "Invalid field - year".
// vi) Return the added movie and a success message: "The movie has been added"
// Write code here

router.post("/add", (req, res) => {
  const newMovie = req.body;
  const existingMovieById = movies.find((movie) => movie.id === newMovie.id);
  const existingMovieByName = movies.find(
    (movie) => movie.name === newMovie.name
  );

  if (existingMovieById || existingMovieByName) {
    return res.status(400).json({
      error: `Movie with ${newMovie.id}/${newMovie.name} already exists.`,
    });
  }
  const requiredFields = ["id", "name", "genre", "rating", "year", "language"];

  for (const field of requiredFields) {
    if (!newMovie[field]) {
      return res.status(400).json({ error: `Invalid field - ${field}` });
    }
  }
  if (!Array.isArray(newMovie.genre) || newMovie.genre.length === 0) {
    return res.status(400).json({ error: "At least one genre is required" });
  }
  const numericRating = parseFloat(newMovie.rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
    return res.status(400).json({ error: "Rating must be between 1 and 10 " });
  }
  const numericYear = parseInt(newMovie.year);
  if (!isNaN(numericYear)) {
    newMovie.year = numericYear;
  } else {
    return res.status(400).json({ error: "Invalid field - year" });
  }
  movies.push(newMovie);
  res.json({ message: "The movie has been added", movie: newMovie });
});

// =============

// =============
// Task 4: Create a route to update the details of a specific movie by its ID using a PUT request.
// Note:
// i) Id field is not modifiable.
// ii) All the other fields are modifiable.
// iii) Before updating, validate all the fields as Task 3.
// iv) If validation failed then return an error message: "Invalid field - ${field} to update!"
// v) Otherwise, return the updated movie and a success message: "The movie has been updated"
// Write code here

router.put("/edit/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;
  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  const index = movies.findIndex((movie) => movie.id === movieId);

  if (index === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }
  const requiredFields = ["name", "genre", "rating", "year", "language"];

  for (const field of requiredFields) {
    if (!updatedMovie[field]) {
      return res
        .status(400)
        .json({ error: `Invalid field - ${field} to update!` });
    }
  }
  const numericRating = parseFloat(updatedMovie.rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
    return res
      .status(400)
      .json({ error: "Rating must be between 1 and 10 (inclusive)" });
  }
  const numericYear = parseInt(updatedMovie.year);
  if (!isNaN(numericYear)) {
    updatedMovie.year = numericYear;
  } else {
    return res.status(400).json({ error: "Invalid field - year to update!" });
  }
  movies[index] = {
    ...movies[index],
    name: updatedMovie.name,
    genre: updatedMovie.genre,
    rating: numericRating,
    year: numericYear,
    language: updatedMovie.language,
  };
  res.json({ message: "The movie has been updated", movie: movies[index] });
});

// =============

// =============
// Task 5: Create a route to delete a movie by its ID using a DELETE request.
// Note:
// i) If the movie not found then return an error message: "Movie with id ${id} not found!"
// ii) Return the deleted movie and a success message: "The movie has been deleted".
// Write code here

router.delete("/:id", (req, res) => {
  const movieId = parseInt(req.params.id);

  if (isNaN(movieId)) {
    return res.status(400).json({ error: "Movie with this id not found!" });
  }
  fs.readFile("movies.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      let movies = JSON.parse(data);
      const index = movies.findIndex((movie) => movie.id === movieId);

      if (index === -1) {
        return res.status(404).json({ error: "Movie with this id not found!" });
      }
      movies.splice(index, 1);
      fs.writeFile("movies.json", JSON.stringify(movies, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "The movie has been deleted by Dipto" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// =============

// =============
// Task 6: Create a route to search movies based on their name. The route should accept a query parameter named "name" and return an array of movies that match the provided name.
// Write code here
router.get("/name", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Movie name is required" });
  }
  fs.readFile("movies.json", "utf8", (err, data) => {
    const movies = JSON.parse(data);
    const matchingMovies = movies.filter((movie) =>
      movie.name.toLowerCase().includes(name.toLowerCase())
    );

    if (matchingMovies.length === 0) {
      return res.status(404).json({ error: "No matching movies found" });
    }
    res.json(matchingMovies);
  });
});
// =============

// =============
// Task 7: Create a route to search movies based on their ratings. The route should accept a query parameter named "rating" and return an array of movies with ratings greater than or equal to the provided value.
// Write code here

router.get("/rating", (req, res) => {
  const { rating } = req.query;
  if (!rating) {
    return res.status(400).json({ error: "Rating is required" });
  }
  const numericRating = parseFloat(rating);
  fs.readFile("movies.json", "utf8", (err, data) => {
    const movies = JSON.parse(data);
    const matchingMovies = movies.filter(
      (movie) => movie.rating >= numericRating
    );
    if (matchingMovies.length === 0) {
      return res.status(404).json({ error: "No matching movies found" });
    }
    res.json(matchingMovies);
  });
});

// =============

// =============
// Task 8: Create a route to search movies based on their language. The route should accept a query parameter named "language" and return an array of movies that match the provided language.
// Write code here
router.get("/language", (req, res) => {
  const { language } = req.query;

  if (!language) {
    return res.status(400).json({ error: "Movie name is required" });
  }
  fs.readFile("movies.json", "utf8", (err, data) => {
    const movies = JSON.parse(data);
    const matchingMovies = movies.filter((movie) =>
      movie.language.toLowerCase().includes(language.toLowerCase())
    );

    if (matchingMovies.length === 0) {
      return res.status(404).json({ error: "No matching movies found" });
    }
    res.json(matchingMovies);
  });
});
// =============

// =============
// Task 9: Create a route to search movies based on their genres. The route should accept a query parameter named "genre" which can contain a single genre or a comma-separated list of genres. Return an array of movies that match at least one of the provided genres.
// Write code here

router.get("/genre", (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({ error: "Genre is required" });
  }
  fs.readFile("movies.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const movies = JSON.parse(data);
      const matchingMovies = movies.filter((movie) =>
        movie.genre.includes(genre)
      );

      if (matchingMovies.length === 0) {
        return res.status(404).json({ error: "No matching movies found" });
      }
      res.json(matchingMovies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// =============

// =============
// Task 10: Test all the implemented routes using a tool like Postman to ensure they are working as expected.
// ---------------------------
// ----------------------------
// -------------------------- Done---------------
// =============

module.exports = router;
