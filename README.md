# Grocery Booking API

Check out *API Testing video solution* : youtu.be/Yk8kttgf8jU?si=btHCCwkVSJUMoo-n

LOCAL: For local testing using local db setup: Use following commands

1. `npm install`
2. `npm start`

DEVELOPMENT: For local development using db service in docker container

1. `bash dev.sh`

PRODUCTION: To test docker container to build and run services (db and nodejs-backend app): Use following commands

1. `bash build.sh`

## ASSIGNMENT OBJECTIVE:

Design API endpoints

1. Admin Responsibilities:
   - Add new grocery items to the system
   - View existing grocery items
   - Remove grocery items from the system
   - Update details (e.g., name, price) of existing grocery items
   - Manage inventory levels of grocery items
2. User Responsibilities:
   - View the list of available grocery items
   - Ability to book multiple grocery items in a single order
3. Advanced Challenge:
   - Containerize the application using Docker for ease of deployment and scaling.
