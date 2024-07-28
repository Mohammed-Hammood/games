import { gamesList } from "@/server/data"

export const getGameBySlug = (slug: string) => {
    return gamesList.find(item => slug == item.slug)
}

export const getGame = async (url: string) => {
    const req = await fetch(url)
    const res = await req.json()
    return res;
}
export const getGames = async (url: string) => {
    const req = await fetch(url)
    const res = await req.json()
    return res;
}

export const getGamesByFilters = (filters: GamesFiltersT & { min: number, max: number }) => {
    const { query,
        language,
        online_play_mode,
        offline_play_mode,
        voice_acting_language,
        platform,
        min,
        max,
        order } = filters;

    let games = gamesList;

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
    return { games, games_count }
}