const prod = {
    url: {
        BASE_URL: "https://my-heroku-app.herokuapp.com/api/v1/",
        // AUTH_URL: 'https://my-heroku-app.herokuapp.com/',
    },
};

const dev = {
    url: {
        BASE_URL: "http://127.0.0.1:5000/api",
        // AUTH_URL: 'http://localhost:3090/',
    },
};

// read more here: https://vite.dev/guide/env-and-mode#node-env-and-modes
export const config = import.meta.env.MODE === "development" ? dev : prod;
