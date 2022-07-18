# Fastify POC App API

API for Fastify API POC

## Environment

Node 14+
yarn 3

## Database

Not yet implemented. It has relationships as follow:

## Installation

```bash
yarn
```

## Starting the Application

```bash
yarn start
```

## Unit testing the Application

```bash
yarn test
```

## API testing the Application

```bash
yarn api-test
```

## Generate Swagger API page
# Required local docker client

```bash
yarn export-docs
```

## Development

```bash
yarn dev
```


## Endpoints

```bash
GET /users

Fetch all users
```

```bash
GET /users/user/:id

Fetch user by id
```

```bash
PUT /users/user/:id

Update user by id
```

```bash
POST /users/user

Add a new user
```

```bash
Delete /users/user/:id

Remove a user
```

## Cross Origin Resource Sharing - CORS
Currently this API only accept swagger API localhost

## Swagger API page
docs/index.html

