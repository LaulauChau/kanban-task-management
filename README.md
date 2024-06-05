## Requirements

- [Bun](https://bun.sh/) >= 1.0.0
- [Node.js](https://nodejs.org/) >= 20.0.0
- a [PostgreSQL](https://www.postgresql.org/) database server (you can use a local one with [Docker-Compose](https://docs.docker.com/compose/) if needed).

## Installation

### Script

1. Run the `start-app.sh` script.

```bash
./scripts/start-app.sh
```

### Docker

1. Create a `.env` from the `.env.example` file and update the environment variables as needed.

```bash
cp .env.example .env
```

2. Start the application with Docker.

```bash
# Make sure to verify the compose file before running it.
docker-compose -f ./docker/docker-compose.yaml up --build -d
```

### Manual

1. Create a `.env` from the `.env.example` file and update the environment variables as needed.

```bash
cp .env.example .env
```

2. Install the dependencies.

```bash
bun install --frozen-lockfile
```

3. Sync the database.

```bash
bun run db:migrate
```

4. Generate the typescript definitions for GraphQL.

```bash
bun run codegen
```

5. Start the server.

```bash
# https://bun.sh/docs/cli/run#bun
bun --bun run dev
```

## Usage

- Access the application at [http://localhost:3000](http://localhost:3000).
- Open the GraphQL Playground at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql).
