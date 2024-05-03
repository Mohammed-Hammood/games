import { NextRequest, NextResponse } from "next/server";
import { gamesList } from "./games";


export async function GET(request: NextRequest) {
    const searchParams = new URL(request.url).searchParams;
    let limit: number = parseInt(searchParams.get("limit") || "10");
    let page: number = parseInt(searchParams.get("page") || "1");
    const query = searchParams.get("query") || "";
    const order = searchParams.get("order") || "id";
    let platform = searchParams.get("platform") || "all" as PlatformT;
    let offline_play_mode = searchParams.get("offline_play_mode") || "all" as PlayModeT;
    let online_play_mode = searchParams.get("online_play_mode") || "all" as PlayModeT;

    let language = searchParams.get("language") || "all";
    let games = gamesList;
    const language_options = ['all', 'english', 'russian'];
    const platform_options: PlatformT[] = ['all', 'Google Stadia', 'Mac', 'Nintendo Switch', 'PC (Microsoft Windows)', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S',];
    const play_mode_options: PlayModeT[] = ['all', 'multi-player', 'single-player'];

    if (!language_options.includes(language)) language = language_options[0];
    if (limit > 100 || limit < 0) limit = 10;
    if (page < 0) page = 1;
    if (!platform_options.includes(platform as PlatformT)) platform = platform_options[0];
    if (!play_mode_options.includes(offline_play_mode as PlayModeT)) offline_play_mode = play_mode_options[0];
    if (!play_mode_options.includes(online_play_mode as PlayModeT)) online_play_mode = play_mode_options[0];

    const max = page * limit;
    const min = max - limit;

    if (query && query.trim().length > 0) {
        const search = (text: string) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());

        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));

    }

    if (language !== 'all') {

        games = games.filter(item => item.available_languages.some(L => L.toLowerCase().includes(language)));

    }
    if (platform !== 'all') {

        games = games.filter(item => item.platforms.some(L => L.toLowerCase().includes(platform.toLowerCase())));
    }
    if (offline_play_mode !== 'all') {
        games = games.filter(item => item.offline_mode.some(L => L.toLowerCase().includes(offline_play_mode.toLowerCase())));
    }

    if (online_play_mode !== 'all') {
        games = games.filter(item => item.online_mode.some(L => L.toLowerCase().includes(online_play_mode.toLowerCase())));
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
        searchParams: {
            limit,
            platform,
            page,
            query,
            language,
            order,
            offline_play_mode,
            online_play_mode,
            language_options,
            platform_options,
            play_mode_options
        },
        games_count,
        games,
    })
} 