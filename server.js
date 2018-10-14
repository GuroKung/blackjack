require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { parse } = require("url");
const morgan = require("morgan");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const apiRoute = require("./routes/api");

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === "dev") server.use(morgan("dev"));

    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    // const parsedUrl = parse(req.url, true);
    // const { pathname, query } = parsedUrl;

    server.use("/api", apiRoute);

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, err => {
        if (err) throw err;
        console.log("> Ready on", PORT);
    });
});
