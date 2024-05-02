import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { gamesList } from "./data.js";
import cors from "@fastify/cors";
// import path from "node:path";
// import static from "@fastify/static";

const app = fastify({ logger: true });

await app.register(cors, {
    origin: ['http://localhost:3000', 'http://localhost:3001']
})
// app.register(require('@fastify/static'), {
//     root: path.join(__dirname, 'public'),
//     prefix: '/public/', // optional: default '/'
//     index: false,

//     constraints: { host: 'localhost' } // optional: default {}
// })

// app.get('/static', function (req, reply) {
//     // reply.sendFile("public", path.join(__dirname, 'public', 'myHtml.html')) //directly
// })

interface ParamsT {
    limit?: string,
    query?: string,
    page?: string,
    category?: string,
    order?: "id" | "-id",
    language?: string,
}

app.get("/", (req, reply) => {
    // return reply.send({
    //     game: `https://${req.hostname}/api/games`,
    // })
    return reply.status(200).type("text/html").send(html);
})

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

// const port = parseInt(process.env.port || "3000");

// app.listen({ port }, (err: any) => {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }
//     console.log(`The server is listening on http://localhost:${port}`)
// })
const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
            />
            <title>Vercel + Fastify Hello World</title>
            <meta
            name="description"
            content="This is a starter template for Vercel + Fastify."
            />
        </head>
        <body>
            <h1>Vercel + Fastify Hello World</h1>
            <p>
            This is a starter template for Vercel + Fastify. Requests are
            rewritten from <code>/*</code> to <code>/api/*</code>, which runs
            as a Vercel Function.
            </p>
            <p>
                For example, here is the boilerplate code for this route:
            </p>
            <pre>
        <code>import Fastify from 'fastify'

        const app = Fastify({
        logger: true,
        })

        app.get('/', async (req, res) => {
        return res.status(200).type('text/html').send(html)
        })

        export default async function handler(req: any, res: any) {
        await app.ready()
        app.server.emit('request', req, res)
        }</code>
            </pre>
            <p>
            <p>
            <a href="https://vercel.com/templates/other/fastify-serverless-function">
            Deploy your own
            </a>
            to get started.
        </body>
        </html>
`;
export default async function handler(req:FastifyRequest, reply:FastifyReply) {
    await app.ready()
    app.server.emit('request', req, reply)
}

