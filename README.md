## SanityDesk test task

1. Write a simple application with React frontend and PHP with MySQL backend that communicate through REST. The application should allow the user (without authentication) to manage notes (list, get, add, delete) with simple text in it (and title and dates). Display the notes in a sorted manner (newest first). Use some ORM library for SQL access. Remember to structure your project as clearly as possible thinking about other people that may work on your project too. Place your project on Git, preferably with commits that will show the project progress. For styling use Less or Sass and go mobile first (do only mobile). Build frontend with Webpack. if you want to you can use Slim Framework for REST backend.

2. Additionally for your application in task 1 extend application to have an user authentication. Create a table of users and restrict access for only this user notes. Remember about frontend for sign in page.

### Users

Available usernames: JohnDoe, JaneDoe

### Architecture

Independant microservices represented by directories `www` (website) and `api`. 

Both microservices are build locally, packaged into docker containers and pushed to public docker registry.

Microservices are hosted on VPS and available by links:

https://sanitydesk-www.thebaronmunchausen.com/

https://sanitydesk-api.thebaronmunchausen.com/
