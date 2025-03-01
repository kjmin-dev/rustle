# Rustle

# Getting Started

### Set up Node.js

```sh
nvm install # Install Node.js version defined in .nvmrc
```

### Run prepare: Execute prepare script for each repository

```sh
yarn prepare
```

### Run dev: Start all repositories

```sh
yarn dev
```

### Run build: Build all repositories

```sh
yarn build
```

### Create a new repository

```sh
yarn new
```

### Run dockerize to build Docker images

```sh
yarn dockerize --help # Follow the guide
yarn dockerize services/api # Build `services/api` into a Docker image
```
