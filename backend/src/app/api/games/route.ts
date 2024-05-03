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

    let language = searchParams.get("language") || "all" as LanguageT;
    let voice_acting_language = searchParams.get("voice_acting_language") || "all" as LanguageT;
    let games = gamesList;
    const language_options:LanguageT[] = ['all', 'english', 'russian'];
    const platform_options: PlatformT[] = ['all', 'Google Stadia', 'Mac', 'Nintendo Switch', 'PC (Microsoft Windows)', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S',];
    const play_mode_options: PlayModeT[] = ['all', 'multi-player', 'single-player'];

    if (!language_options.includes(language as LanguageT)) language = language_options[0];
    if (!language_options.includes(voice_acting_language as LanguageT)) language = language_options[0];
    if (!platform_options.includes(platform as PlatformT)) platform = platform_options[0];
    if (!play_mode_options.includes(offline_play_mode as PlayModeT)) offline_play_mode = play_mode_options[0];
    if (!play_mode_options.includes(online_play_mode as PlayModeT)) online_play_mode = play_mode_options[0];

    if (limit > 100 || limit < 0) limit = 10;
    if (page < 0) page = 1;

    const max = page * limit;
    const min = max - limit;

    if (query && query.trim().length > 0) {
        const search = (text: string) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());

        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));

    }

    games = games.filter(item =>
        (language === 'all' || item.available_languages.includes(language as LanguageT)) &&
        (offline_play_mode === 'all' || item.offline_mode.includes(offline_play_mode as PlayModeT)) &&
        (online_play_mode === 'all' || item.online_mode.includes(online_play_mode as PlayModeT)) &&
        (voice_acting_language === 'all' || item.voice_acting.includes(voice_acting_language as LanguageT)) &&
        (platform === 'all' || item.platforms.includes(platform as PlatformT))
    )
    const games_count = games.length;

    games = games.sort((a, b) => order === 'id' ? a.id - b.id : b.id - a.id).filter((_, i) => i >= min && i < max);

    const origin = request.nextUrl.origin;

    games = games.map(item => {
        return {
            ...item,
            cover: origin + item.cover,
            screenshots: item.screenshots.map(s => origin + s),
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
            voice_acting_language,
            offline_play_mode,
            online_play_mode,
            language_options,
            platform_options,
            play_mode_options,
            voice_acting_language_options: language_options,
        },
        games_count,
        games,
    })
} 