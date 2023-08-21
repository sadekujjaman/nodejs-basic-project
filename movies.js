const express = require("express");
const router = express.Router();
const movies = require("./movies.json");
console.log({ movies });

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

// =============

// =============
// Task 2: Create a route that accepts a movie ID as a parameter and returns the details of the specific movie with that ID.
// Note: It should return a single json object if movies found, otherwise returns empty object.
// Write code here

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

// =============

// =============
// Task 5: Create a route to delete a movie by its ID using a DELETE request.
// Note:
// i) If the movie not found then return an error message: "Movie with id ${id} not found!"
// ii) Return the deleted movie and a success message: "The movie has been deleted".
// Write code here

// =============

// =============
// Task 6: Create a route to search movies based on their name. The route should accept a query parameter named "name" and return an array of movies that match the provided name.
// Write code here

// =============

// =============
// Task 7: Create a route to search movies based on their ratings. The route should accept a query parameter named "rating" and return an array of movies with ratings greater than or equal to the provided value.
// Write code here

// =============

// =============
// Task 8: Create a route to search movies based on their language. The route should accept a query parameter named "language" and return an array of movies that match the provided language.
// Write code here

// =============

// =============
// Task 9: Create a route to search movies based on their genres. The route should accept a query parameter named "genre" which can contain a single genre or a comma-separated list of genres. Return an array of movies that match at least one of the provided genres.
// Write code here

// =============

// =============
// Task 10: Test all the implemented routes using a tool like Postman to ensure they are working as expected.

// =============

module.exports = router;
