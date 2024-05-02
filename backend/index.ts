require('dotenv').config();

import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { gamesList } from './data';
// import path  from "node:path";


// const path = require("path");

const app: Express = express();

app.use(express.static('public'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://games-list.vercel.app",
    ]
}));


// app.use('/static', express.static(path.join(__dirname, 'public')));


app.get("/", function (req: Request, res: Response) {
    const html =  `<html><body>
    <h1>This is the api for Games application</h1>
    </body></html>`;
    res.status(200);
    res.send(html);
    // res.sendFile(__dirname + "/views/pages/home.html");
    // res.send('endpoints')
});


interface ParamsT {
    limit?: string,
    query?: string,
    page?: string,
    category?: string,
    order?: "id" | "-id",
    language?: string,
}


app.get("/api/games", (req, reply) => {
    let games = gamesList;
    const { query, language, page: _p, limit: _l, order } = req.query as ParamsT

    const page = parseInt(_p ?? '1');
    let limit = parseInt(_l ?? '10');

    if (limit > 100) limit = 10;
    const max = page * limit;
    const min = max - limit;

    if (query && query.trim().length > 0) {
        const search = (text: string) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());

        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));

    }

    if (language && language.trim().length > 0 && language.toLowerCase() !== 'all') {

        games = games.filter(item => item.available_languages.some(L => L.toLowerCase().includes(language)));

    }
    const games_count = games.length;

    games = games.sort((a, b) => order === 'id' ? a.id - b.id : b.id - a.id).filter((_, i) => i >= min && i < max);


    const query_params = { limit, page, query, language, max, min, }

    reply.send({
        query_params,
        ok: true,
        games_count,
        status: 200,
        games,
    })
})


const port = 3000; //process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

module.exports = app;