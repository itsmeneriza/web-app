1. Description about the web application:

The application is a REST API that stores and updates Lion King character information. It has four entities comprising of id, name, species, description, movie_quote, which users can access and modify over the web via endpoints on REST-API browser extensions or directly by running "index.html". By accessing the web endpoints, users can perform CRUD operations with HTTP methods.

Endpoints/Routes:
http://localhost:3000/lionking - GET
http://localhost:3000/lionking/id - GET character by ID
http://localhost:3000/lionking/create - POST
http://localhost:3000/lionking/update/id - PUT
http://localhost:3000/lionking/delete/id - DELETE


2. Steps to run locally after cloning:

Requirements: Node.js and Github application

- Set-up the environment by navigating to the local repository of the cloned folder and accessing CMD.

- Initialize the project by entering the command "npm init" to create a "package.json" file.

- To install the dependencies listed in "package.json", run the command "npm install".

- Start the application through the entry point server.js of the application by running "node server.js".

- Verify if the application is running correctly by accessing "http://localhost:3000/lionking". It should not prompt errors.

