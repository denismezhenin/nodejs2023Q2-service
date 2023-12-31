# Home Library Service

Resuful API Music home library with authorization

## Features

- Rest Api
- Custom logger
- Authorization
- Database volumes and logs
- Docker container hot reload
- Typeorm for postgres
- Request validataion

## Tech stack

- Node.js
- Nest.js
- JWT
- Docker
- Postgres
- Typeorm

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/denismezhenin/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

### Create Env

```
cp .env.example .env
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

```
docker compose up
```

## Scan vulnerability

```
docker scout cves nodejs2023q2-service-app:latest
```

```
docker scout recommendations nodejs2023q2-service-app:latest
```

## Migrations 

Create

```
npm run migration:create
```

Run
```
npm run migration:run
```

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
