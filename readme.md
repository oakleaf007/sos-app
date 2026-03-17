## Helping Hand (backend service)

**Helping Hand** is an emergency assistance platform where users can send SOS alerts and nearby volunteers can respond to help.

---
## Description

This is  the backend service for the app called **Helping Hand**.
The backend provides API for:

- user authentication
- nearby important place searching API (e.g. Police station, hospital etc.)

## Tech stack

- Node.js
- Express.js
- MongoDb
- JWT
- Mongoose

## Project structure

- **config** folder contains  MongoDb connection
- **controllers** folder contains REST controllers
- **models** folder contains MongoDB schemas
- **routes** folder contains API routes
- **services** folder contains business logic
- **utils** folder contains some helping utility programs

- **app.js** contains express application config
- **server.js** contains the server startup logic

## Env Variables
  ```
 PORT - describe the port where the server will run
 MONGO_URI - describe the Mongo connection string here
```

## Testing info

- No automated tests are included.
- APIs tested with **curl** only.

## Setup Instructions

- Install dependencies  
  ```npm install```
- Create .env file with these variable:  
  ```PORT, MONGO_URI```
- Run the the server  
  ```npm start or nodemon server.js```

---