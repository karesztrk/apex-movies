# Apex Movies

This is a homework project demonstrating the capabilities of [React](https://reactjs.org/) & [Vite](https://vitejs.dev/).

## Configuration

The application is communicating with several APIs including:

-   Apex Labs GraphQL API (`VITE_API_URL`)
-   Wikipedia API (`VITE_WIKI_API_URL`)
-   IMDB API (`VITE_IMDB_API_URL` & `VITE_IMDB_API_KEY`)

Each API is preconfigured in the dotenv configuration. Please note that the IMDB API requires the API key to be present.

## How to run development server

By default, the application is started under port _3000_.

```
npm install
npm run dev
```

## How to execute tests?

Unit tests are executed by [Vitest](https://vitest.dev/).

```
npm run test
```
