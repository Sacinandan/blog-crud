
# Boilerplate GraphQL API BLOG CRUD ![version](https://img.shields.io/badge/version-1.0.0-blue.svg) 

## Description

<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" class="d-block rounded-1 mr-3 flex-shrink-0" alt="docker logo" width="64" height="64"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlzfeI3PdYDN7Q9uH2ne6nBsMwZMbc1Oz0WZwLD-9guX0es17_" class="d-block rounded-1 mr-3 flex-shrink-0" alt="prisma logo" width="64" height="64"> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" class="d-block rounded-1 mr-3 flex-shrink-0" alt="npm logo" width="64" height="64"> <img src="https://camo.githubusercontent.com/c4fd9ae4b5274b73d4d51c42263409ce74572040/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667" class="d-block rounded-1 mr-3 flex-shrink-0" alt="nestjs logo" width="64" height="64"> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" class="d-block rounded-1 mr-3 flex-shrink-0" alt="typescript logo" width="64" height="64"> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/graphql/graphql.png" class="d-block rounded-1 mr-3 flex-shrink-0" alt="graphql logo" width="64" height="64">

Boilerplate application with Prisma, MongoDB, Nest.js, GraphQL, Winston.

## Configuration

All environment constants are in the `.env` file

## Installation

```bash
$ npm install
$ npm audit fix
$ docker-compose up -d
$ prisma deploy -e .env
```

Attention!
If prisma bug will not bee fixed for working with environments, open `generated\prisma-client\index.ts`.
At the end of file change these lines to variables' values from `.env` file:

```typescript
endpoint: `http://localhost:4466`,
secret: `1029384756qwerty`
```

## ORM interface for database

```bash
$ prisma token --copy
```

Open the Prisma admin [page](http://localhost:4466/_admin).

Prisma Admin [FAQ](https://www.prisma.io/blog/prisma-admin-beta-pai5lah43soe).

In the top right corner press on `Project settings`.
Select `Secret token` input field and past the key ( <button>Ctrl</button> + <button>V</button> ).

Press `Save changes` button.

## Running the app

Add your JWT secret key from `.env` file before command:

development mode
```bash
$ JWT_SECRET=D078E9961895B111EC7BA7C0F035296D3F080F7678466FBB208E429D9DC778EA npm start
```
watch mode
```bash
$ JWT_SECRET=D078E9961895B111EC7BA7C0F035296D3F080F7678466FBB208E429D9DC778EA npm run start:dev
```

production mode
```bash
$ JWT_SECRET=D078E9961895B111EC7BA7C0F035296D3F080F7678466FBB208E429D9DC778EA npm run start:prod
```

## Working with API Requests

Postman GraphQL API Requests documentation for import `GraphQL Blog.postman_collection.json`.

Postman GraphQL [FAQ](https://blog.postman.com/2019/06/18/postman-v7-2-supports-graphql/).


## License

[MIT licensed](LICENSE).
