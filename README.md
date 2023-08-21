# nodejs-basic-project

NodeJS basic project

This is a [NodeJS](https://nodejs.org/en) project bootstrapped with [`node`](https://nodejs.org/en/docs/guides/getting-started-guide).

### System Requirements

1. [Node.js](https://nodejs.org/en/) 12.22.0 or later
2. [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
3. [Nodemon](https://www.npmjs.com/package/nodemon), See below installation guide.
4. MacOS, Windows (including WSL), and Linux are supported

### Install Nodemon Using npm

```bash
npm install -g nodemon
```

### Setup

First, install the dependencies for this project (Make sure you're in the project directory):

```bash
yarn
# or
npm install
```

Then, run the development server:

```bash
yarn start
# or
npm run start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see `Server listening at http://localhost:4000`.

### Tasks

There are a set of tasks to complete related to a basic Node.js project.

1. The project involves creating an API to manage a list of movies using Express and a JSON file.
2. Those tasks include implementing routes for fetching all movies, getting a specific movie by ID, adding new movies, updating existing movies, and deleting movies.
3. Additionally, you'll need to implement search functionality for movies based on their name, ratings, genre, and language.

Note: Keep in mind that we're not setting up a database for this exercise; we'll be working with a JSON file for simplicity. Take your time to understand the provided code and work on the tasks within the next 3 days. If you have any questions or need clarification, feel free to ask.

#### Your Tasks:

1. Task 1: Create a route to handle a GET request to fetch all movies and send the movies JSON array as a response. Note: Returns an empty array if movies not found.

2. Task 2: Create a route that accepts a movie ID as a parameter and returns the details of the specific movie with that ID. Note: It should return a single json object if movies found, otherwise returns empty object.

3. Task 3: Create a route to handle a POST request to add a new movie to the "movies" array. Note:

   - Validate Id and name fields - these must be unique. If a movie already exists with the provided id or name, then return "Movie with ${id}/${name} already exists."
   - Validate other fields, if a field not found or for invalid data, return "Invalid field - ${fieldName}"
   - Must have at least one genre.
   - Rating must be between 1 to 10(inclusive)
   - Apply auto coercion for number fields(if possible). {"year": "2016"} should be converted to {"year": 2016} but {"year" : "abc"} should return "Invalid field - year".
   - Return the added movie and a success message: "The movie has been added"

4. Task 4: Create a route to update the details of a specific movie by its ID using a PUT request. Note:

   - Id field is not modifiable.
   - All the other fields are modifiable.
   - Before updating, validate all the fields as Task 3.
   - If validation failed then return an error message: "Invalid field - ${field} to update!"
   - Otherwise, return the updated movie and a success message: "The movie has been updated"

5. Task 5: Create a route to delete a movie by its ID using a DELETE request. Note:

   - If the movie not found then return an error message: "Movie with id ${id} not found!"
   - Return the deleted movie and a success message: "The movie has been deleted".

6. Task 6: Create a route to search movies based on their name. The route should accept a query parameter named "name" and return an array of movies that match the provided name.

7. Task 7: Create a route to search movies based on their ratings. The route should accept a query parameter named "rating" and return an array of movies with ratings greater than or equal to the provided value.

8. Task 8: Create a route to search movies based on their language. The route should accept a query parameter named "language" and return an array of movies that match the provided language.

9. Task 9: Create a route to search movies based on their genres. The route should accept a query parameter named "genre" which can contain a single genre or a comma-separated list of genres. Return an array of movies that match at least one of the provided genres.

10. Task 10: Test all the implemented routes using a tool like Postman to ensure they are working as expected.

All the data contains in the movies array. Here's what the schema looks like:

```
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
```
