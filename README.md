## Todo list API in Express JS
This is a Todo list API made in the Express framework with all the specifications made in A1 of the Backend AI track at FlyRank AI.

----------
#### Installation:

Download the full code, set the .env variables like in `.env.example`, and run `docker compose up`, docker will start the API and database.

----------
#### API endpoints:

This version of the project includes endpoints that utilize the **Authentication** feature of supabase with some endpoints requiring you to login and have a bearer token to access, these enpoints are prefixed by `/protected`.

| Method | Endpoint               | Description                                      | Request Body                                    | Success Response                        | Error Response(s)                                                  |
|--------|-------------------------|---------------------------------------------------|--------------------------------------------------|-------------------------------------------|----------------------------------------------------------------------|
| GET    | `/`                     | API info and available endpoints                  | -                                                | `200 OK`                                  | -                                                                      |
| GET    | `/health`               | Health check                                       | -                                                | `200 OK`                                  | -                                                                      |
| GET    | `/tasks`                | Get all tasks                                      | -                                                | `200 OK`, array of tasks                  | -                                                                      |
| GET    | `/tasks/:id`            | Get a single task by id                            | -                                                | `200 OK`, task object                     | `404 Not Found`, task doesn't exist                                    |
| POST   | `/tasks`                | Create a new task                                  | `{ "title": "string" }`                         | `201 Created`, new task                   | `400 Bad Request`, missing/empty title                                 |
| PUT    | `/tasks/:id`            | Update an existing task                            | `{ "title": "string", "done": bool }`           | `200 OK`, updated task                    | `400 Bad Request`, `404 Not Found`                                     |
| DELETE | `/tasks/:id`            | Delete a task by id                                | -                                                | `204 No Content`                          | `404 Not Found`, task doesn't exist                                    |
| POST   | `/auth/signup`          | Register a new user                                | `{ "email": "string", "password": "string" }`   | `201 Created`, new user data              | `400 Bad Request`, missing/invalid email or password                   |
| POST   | `/auth/login`           | Log in an existing user                            | `{ "email": "string", "password": "string" }`   | `201 Created`, `{ accessToken, refreshToken }` | `400 Bad Request`, missing credentials; `401 Unauthorized`, invalid credentials |
| POST   | `/auth/logout`          | Log out the authenticated user                     | none, requires `Authorization: Bearer <token>`  | `204 No Content`                          | `401 Unauthorized`, missing/invalid/expired token                      |
| GET    | `/public/info`          | Get publicly accessible info                       | -                                                | `200 OK`                                  | -                                                                      |
| GET    | `/protected/profile`    | Get the authenticated user's profile               | none, requires `Authorization: Bearer <token>`  | `200 OK`, `{ id, email, created_at }`     | `401 Unauthorized`, missing/invalid/expired token                      |
| GET    | `/protected/dashboard`  | Get the authenticated user's dashboard greeting    | none, requires `Authorization: Bearer <token>`  | `200 OK`, `{ message }`                   | `401 Unauthorized`, missing/invalid/expired token                      |
----------
#### Example Curl output:
```
  curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-gPXr/tBcmKMXZwSEhav9o8e9gYc"
Date: Tue, 15 Sep 2026 21:10:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":5,"title":"Buy milk","done":false}
```
This is the curl output of the post method with just the title.

----------

#### Swagger UI:

<img width="1907" height="911" alt="image" src="https://github.com/user-attachments/assets/7abf0122-2c2e-4c33-93fd-55ad861fbb63" />


This is the Swagger UI made using Swagger-jsdocs. <br>
`Transparency notes: The actual integration of the Swagger UI is handmade, the documentation itself was done using a claude project`

----------

#### PostgreSQL:

**Why**:
- Scalable and supports many users
- Is the standard in many applications

**Code**:
- Image is hosted on docker and not locally ran.

**Database in tableplus (tool of choice)**:

<img width="1919" height="1010" alt="image" src="https://github.com/user-attachments/assets/d2dd4af6-dc50-4631-96c2-7bd65724e4fe" />

**Example query**:

<img width="372" height="467" alt="image" src="https://github.com/user-attachments/assets/af98b43a-2bdd-49a3-8dfd-1a8066d1ed2b" />
