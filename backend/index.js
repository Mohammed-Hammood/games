import fastify from "fastify";
import { gamesList } from "./data.js";
import cors from "@fastify/cors";
// import path from "node:path";
// import static from "@fastify/static";
const app = fastify({ logger: true });
await app.register(cors, {
    origin: ['http://localhost:3000', 'http://localhost:3001']
});
app.get("/", (req, reply) => {
    return reply.send({
        game: `https://${req.hostname}/api/games`,
    });
});
app.get("/api/games", (req, reply) => {
    let games = gamesList;
    const { query, language, page: _p, limit: _l, order } = req.query;
    const page = parseInt(_p ?? '1');
    let limit = parseInt(_l ?? '10');
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
const port = parseInt(process.env.port || "3000");
app.listen({ port }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`The server is listening on http://localhost:${port}`);
});
