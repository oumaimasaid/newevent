



# Event Management Application

This is an event management application built using Express, GraphQL, and SQLite. It provides both a GraphQL API and REST API for managing events.

## Prerequisites

- Node.js
- SQLite

## Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
Navigate to the project directory:

``` shell
cd event-management-app
```
Install the dependencies:

```shell
npm install
```
Create the SQLite database:

```shell

touch database.sqlite
```
Start the server:

```shell
npm start
```
The server will start running on http://localhost:5000.

Usage
GraphQL API
The GraphQL API provides the following endpoints:

- POST /graphql: Access the GraphQL API. You can use the GraphiQL interface to test and explore the API. Open the URL 
- http://localhost:5000/graphql in a web browser to access the GraphiQL interface.
REST API
- The REST API provides the following endpoints:

- GET /events: Get a list of all events.
- GET /event/:id: Get a specific event by ID.
- POST /event: Create a new event.
- PUT /event/:id: Update an existing event.
DELETE /event/:id: Delete an event.
- To make requests to the REST API, you can use tools like cURL or Postman.

## Database Schema
- The application uses a SQLite database to store event data. The database schema consists of a single table named events with the 
 following columns:

- id: INTEGER (Primary key, Autoincrement)
name: TEXT (Event name)
categorie: TEXT (Event category)
Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

# License
- This project is licensed under the MIT License.

```javascript
Copy code

Make sure to replace `<repository_url>` with the actual URL of your repository.

This README file provides an overview of the application, installation instru
```