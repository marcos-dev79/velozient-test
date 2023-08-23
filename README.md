# velozient-test
password manager example in golang.

## Backend

The backend was written in Golang, and without a database I kept stored an array of elements to represent in memory the data.
For demo, I added a docker compose configuration, so you can run this backend by typing this command in a linux machine with 
docker / docker compose installed

- docker-compose up --build

In case you don't have docker, you can find the executable built in the main folder.

## Frontend

The frontend was created with React / Typescript and it is simple just for demo. To run, enter in the frontend/velozient-app folder and
run npm run build && npm run start. Then open it in your browser.

### See ya!
