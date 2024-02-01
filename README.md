# Blog-Rest-API
RESTful API backend for a blog using Node.js and MongoDB

## Enviroment Variables

To run this project, you need to configure the required environment variables by renaming the `.env.example` file. Simply remove the **.example** extension to create your `.env` file with your specific settings.

## Database Connection

Add your MongoDB URI to your `.env` file to connect to the database.

## Installation

Clone the Project:

```bash
  git clone https://github.com/SelenKockar/Blog-Rest-API.git
```

Navigate to the Project Directory:

```bash
  cd Blog-Rest-API
```

Install Dependencies:

```bash
  npm install
```

Start the Server:

```bash
  npm run start
```


## Endpoints

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`   | `/auth/signup`                           | Registers a new user account.            |
| `POST`   | `/auth/login`                            | Authenticates and logs in a user.        |
| `POST`   | `/auth/logout`                           | Logs out a currently authenticated user. |
| `GET`    | `/posts`                                 | Returns all posts.                       |
| `GET`    | `/posts/:id`                             | Returns the post with a specific ID.     |
| `GET`    | `/posts?keywords=&page=&perPage=`        | Searches and paginates among the posts.  |
| `POST`   | `/posts`                                 | Creates new blog post.                   |
| `PUT`    | `/posts/:id`                             | Updates the post with a specific ID.     |
| `DELETE` | `/posts/:id`                             | Deletes the post with a specific ID.     |
| `GET`    | `/comments`                              | Returns all comments.                    |
| `GET`    | `/comments/:id`                          | Returns a comment with a specific ID.    |
| `POST`   | `/comments`                              | Creates a comment for specific blog post.|
| `PUT`    | `/comments/:id`                          | Updates a comment with a specific ID.    |
| `DELETE` | `/comments/:id`                          | Deletes a comment with a specific ID.    |


  
## Technologies Used

**Database:** MongoDB

**Server:** Node, Express, Mongoose

  

