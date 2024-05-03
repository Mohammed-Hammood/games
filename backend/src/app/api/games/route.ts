import { NextRequest, NextResponse } from "next/server";
import { gamesList } from "./games";


export async function GET(request: NextRequest) {
    const searchParams = new URL(request.url).searchParams;
    let limit: number = parseInt(searchParams.get("limit") || "10");
    let page: number = parseInt(searchParams.get("page") || "1");
    const query = searchParams.get("query") || "";
    const order = searchParams.get("order") || "id";
    let language = searchParams.get("language") || "all";
    let games = gamesList;
    const available_languages = ['all', 'english', 'russian'];

    if (!available_languages.includes(language)) language = available_languages[0];
    if (limit > 100 || limit < 0) limit = 10;
    if (page < 0) page = 1;
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

    const endpoint = request.nextUrl.origin;

    games = games.map(item => {
        return {
            ...item,
            image: endpoint + item.image,
            screenshots: item.screenshots.map(s => endpoint + s),
        }
    })

    return NextResponse.json({
        ok: true,
        searchParams: { limit, page, query, language, order, available_languages },
        games_count,
        games,
    })
} 