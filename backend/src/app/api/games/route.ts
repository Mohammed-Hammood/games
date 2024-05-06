import { NextRequest, NextResponse } from "next/server";
import { gamesList } from "./games";

export async function GET(request: NextRequest) {
    const searchParams = new URL(request.url).searchParams;
    let limit: number = parseInt(searchParams.get("limit") || "10");
    let page: number = parseInt(searchParams.get("page") || "1");
    const query = searchParams.get("query") || "";
    let order = searchParams.get("order") || "release_date";
    let platform = searchParams.get("platform") || "All" as PlatformT;
    let online_play_mode = searchParams.get("online_play_mode") || "All" as PlayModeT;
    let offline_play_mode = searchParams.get("offline_play_mode") || "All" as PlayModeT;

    let language = searchParams.get("language") || "All" as LanguageT;
    let voice_acting_language = searchParams.get("voice_acting_language") || "All" as LanguageT;
    let games = gamesList;

    const language_options: LanguageT[] = ['All', 'English', 'Russian', 'Japanese'];
    const platform_options: PlatformT[] = ["All", "Linux", "Mac", "Xbox One", "Xbox Series X|S", "Google Stadia", "PC (Microsoft Windows)", "Sega Mega Drive/Genesis", "DOS", "Mega-CD/Sega CD", "Game Gear", "Sega Saturn", "GameCube", "Gizmondo", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PlayStation Portable", "PlayStation Vita", "Nintendo Switch", "3DO Interactive Multiplayer", "Microsoft Windows", "iOS", "Java Platform", "Micro Edition", "Android", "Xbox 360", "Xbox", "Xbox One", "Xbox Series X", "Windows Phone", "macOS", "Zeebo", "Stadia"]
    const play_mode_options: PlayModeT[] = ['All', 'Multiplayer', 'Single-player'];
    const order_options = ['release_date', 'rating', '-rating', '-release_date'];

    if (!language_options.includes(language as LanguageT)) language = language_options[0];
    if (!language_options.includes(voice_acting_language as LanguageT)) language = language_options[0];
    if (!platform_options.includes(platform as PlatformT)) platform = platform_options[0];
    if (!play_mode_options.includes(offline_play_mode as PlayModeT)) offline_play_mode = play_mode_options[0];
    if (!play_mode_options.includes(online_play_mode as PlayModeT)) online_play_mode = play_mode_options[0];
    if (!order_options.includes(order)) order = order_options[0];

    if (limit > 100 || limit < 0) limit = 10;
    if (page < 0) page = 1;

    const max = page * limit;
    const min = max - limit;

    if (query && query.trim().length > 0) {
        const search = (text: string) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());

        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));

    }

    games = games.filter(item =>
        (language === 'All' || item.available_languages.includes(language as LanguageT)) &&
        (online_play_mode === 'All' || item.online?.mode.includes(online_play_mode as PlayModeT)) &&
        (offline_play_mode === 'All' || item.offline?.mode.includes(offline_play_mode as PlayModeT)) &&
        (voice_acting_language === 'All' || item.voice_acting.includes(voice_acting_language as LanguageT)) &&
        (platform === 'All' || item.platforms.includes(platform as PlatformT))
    )
    const games_count = games.length;

    games = games.sort((a, b) => {
        if (order === 'rating') return a.rating_average - b.rating_average
        else if (order === '-rating') return b.rating_average - a.rating_average
        else if (order === '-release_date') return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        else if (order === 'release_date') return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
        return a.id - b.id
    })
        .filter((_, i) => i >= min && i < max);

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
            order_options,
            play_mode_options,
            voice_acting_language_options: language_options,
        },
        games_count,
        games,
    })
} 