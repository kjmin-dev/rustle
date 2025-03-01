# Rustle-API

### Run dev

```sh
yarn dev
```

### Build docker

```sh
yarn dockerize services/api # Run in monorepo root
```

### Run dokcer

```sh
docker run -itd -p 3000:3000 --name rustle-api rustle-services/api
```
