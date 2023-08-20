# nodejs-basic-project

NodeJS basic project

This is a [NodeJS](https://nodejs.org/en) project bootstrapped with [`node`](https://nodejs.org/en/docs/guides/getting-started-guide).

### System Requirements

1. [Node.js](https://nodejs.org/en/) 12.22.0 or later
2. [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
3. [Nodemon](https://www.npmjs.com/package/nodemon), See below installation guide.
4. MacOS, Windows (including WSL), and Linux are supported

### Software Requirements

1. [MongoDB](https://www.mongodb.com/): A NoSQL database used for storing data

### Install Nodemon Using npm

```bash
npm install -g nodemon
```

### Setup

First, install the dependencies for this project (Make sure you're in the `bank` directory):

To change the directory to `bank`,

```bash
cd bank
```

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

Open [http://localhost:4002](http://localhost:4002) with your browser to see `Your server is running on port 4002!`..

### FAQ

To work with this project one must have prepare a environment file with following properties.
The file name should be `.env` and must contain in the project directory.

```
MONGODB_URI=mongodb+srv://<username>:<password>@<host>.mongodb.net/<db-name>
```

\*\*\* Replace `<username>` and `<password>` with your mongodb username and password respectfully. Replace `<host>` with your mongodb host name. Also replace `db-name` with your db name in mongodb(ex: demo).

Here is an example of `MONGODB_URI`:

```bash
MONGODB_URI=mongodb+srv://myuser:mypassword@abccew73.mongodb.net/demo

```

You can get this `MONGODB_URI` from your mongodb atlas account. [Mongodb Atlas/](https://cloud.mongodb.com/).

To get more info:

1. [NodeJS Quick Start](https://nodejs.dev/en/learn/)
2. [Mongodb Atlas Quick Start](https://www.mongodb.com/docs/atlas/getting-started/)
3. [Mongodb](https://www.mongodb.com/docs/drivers/node/current/)

API routes can be accessed on [http://localhost:4002/api/v1/](http://localhost:4002/api/v1/). Those endpoints are available in `index.js`.
