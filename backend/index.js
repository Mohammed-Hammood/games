"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_1 = require("./data");
// import path  from "node:path";
// const path = require("path");
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://games-list.vercel.app",
    ]
}));
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    const html = `<html><body>
    <h1>This is the api for Games application</h1>
    </body></html>`;
    res.status(200);
    res.send(html);
    // res.sendFile(__dirname + "/views/pages/home.html");
    // res.send('endpoints')
});
app.get("/api/games", (req, reply) => {
    let games = data_1.gamesList;
    const { query, language, page: _p, limit: _l, order } = req.query;
    const page = parseInt(_p !== null && _p !== void 0 ? _p : '1');
    let limit = parseInt(_l !== null && _l !== void 0 ? _l : '10');
    if (limit > 100)
        limit = 10;
    const max = page * limit;
    const min = max - limit;
    if (query && query.trim().length > 0) {
        const search = (text) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());
        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));
    }
    if (language && language.trim().length > 0 && language.toLowerCase() !== 'all') {
        games = games.filter(item => item.available_languages.some(L => L.toLowerCase().includes(language)));
    }
    const games_count = games.length;
    games = games.sort((a, b) => order === 'id' ? a.id - b.id : b.id - a.id).filter((_, i) => i >= min && i < max);
    const query_params = { limit, page, query, language, max, min, };
    reply.send({
        query_params,
        ok: true,
        games_count,
        status: 200,
        games,
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map