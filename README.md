# Allocate Backend

## Completeness
This is a fully functional prototype for the backend of the application. There are currently no known bugs in the application. The application is deployed to the Heroku and the URL for the backend is as follows : https://accordallocate.herokuapp.com. The application uses NestJS which is based on Typescript and it provides the typesafety by default. The application uses MYSQL as the backend.

**Intructions to run**

Clone the repository and run the following instructions:
* npm install
* npm run start

Currently the application will not run as it requires a .env file with the database credentials.

## Code Quality
This application is built using the NestJS framework, and it is following all the quality standards defined by the framework. Every similar functionality were grouped into one module and every module has its own dto (data transfer object), model(to connect with the database) and interface (to interact within the application) folders to interact with the request data and database. I have made sure that every function can be as small as possible and self explainatory.


## Scalability
This application was designed with scalability in mind. It is currently deployed on the free tier, hence it is currently slow on the first request as the application goes to sleep due to heroku policies, but subsequent request are fast. Once deployed to the paid tier, the application will perform faster.

## Security
We were focused on maintainig good security standards while developing this application. Rest API are secured by JWT. Every API calls(except the login) requires a valid token in the authorization header. There are currently two types of users

* Ambulance Paramedics
* Hospital Staff

Each user cannot use the other's API and are restricted to their own set of APIs.

## Analytics
We currently are not recording any analytics from the user. This is one of the furture scope of our application.