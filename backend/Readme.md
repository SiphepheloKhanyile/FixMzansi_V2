# Backend API Documentation
Welcome to the documentation for the backend API of FixMzansi_V2. This document provides an overview of the available endpoints and their functionalities.

## Authentication

To access the API endpoints, you need to include an `Authorization` header in your requests. The value of the header should be a valid JWT token.

## Endpoints

### 1. `/users`

- `GET /users` - Retrieve a list of all users.
- `GET /users/{id}` - Retrieve a specific user by ID.
- `POST /users` - Create a new user.
- `PUT /users/{id}` - Update an existing user.
- `DELETE /users/{id}` - Delete a user.

### 2. `/issues`

- `GET /issues/` - Retrieve a list of all posts.
- `GET /issues/{id}` - Retrieve a specific post by ID.
- `POST /issues/` - Create a new post.
- `PUT /issues/` - Update an existing post.
- `DELETE /issues/{id}` - Delete a post.

### 3. `/comments`

- `GET /issues/comments` - Retrieve a list of all comments.
- `GET /issues/comments/{id}` - Retrieve a specific comment by ID.
- `POST /issues/comments` - Create a new comment.
- `PUT /issues/comments/{id}` - Update an existing comment.
- `DELETE /issues/comments/{id}` - Delete a comment.

### 4. `/mediacontent`

- `GET /issues/media` - Retrieve a list of all media content.
- `GET /issues/media/{id}` - Retrieve a specific media content by ID.
- `POST /issues/media/` - Create a new media content.
- `PUT /issues/media/` - Update an existing media content.
- `DELETE /issues/media/{id}` - Delete a media content.

### 5. `/upvotes`

- `GET /issues/upvotes/` - Retrieve a list of all upvotes.
- `GET /issues/upvotes/{id}` - Retrieve a specific upvote by ID.
- `POST /issues/upvotes/` - Create a new upvote.
- `PUT /issues/upvotes/` - Update an existing upvote.
- `DELETE /issues/upvotes/{id}` - Delete an upvote.

### 6. `/downvotes`

- `GET /issues/downvotes/` - Retrieve a list of all downvotes.
- `GET /issues/downvotes/{id}` - Retrieve a specific downvote by ID.
- `POST /issues/downvotes/` - Create a new downvote.
- `PUT /issues/downvotes/` - Update an existing downvote.
- `DELETE /issues/downvotes/{id}` - Delete a downvote.

### 7. `/alerts`

- `GET /alerts/` - Retrieve a list of all alerts.
- `GET /alerts/{id}` - Retrieve a specific alert by ID.
- `POST /alerts/` - Create a new alert.
- `PUT /alerts/` - Update an existing alert.
- `DELETE /alerts/{id}` - Delete an alert.

## Error Handling

In case of any errors, the API will return appropriate HTTP status codes along with error messages in the response body.

## Conclusion

This concludes the API documentation for the backend of FixMzansi_V2. Please refer to the individual endpoint descriptions for more details on how to use them.

