
const baseURL = process.env.NODE_ENV === 'production' ? 'https://backend-api-games.vercel.app' :  `http://localhost:3001`;


export const Endpoints = {
    games: ({ limit, page, query, language, order, platform, voice_acting_language, offline_play_mode, online_play_mode }: GamesFiltersT) => `${baseURL}/api/games?query=${query}&page=${page}&language=${language}&order=${order}&limit=${limit}&platform=${platform}&voice_acting_language=${voice_acting_language}&offline_play_mode=${offline_play_mode}&online_play_mode=${online_play_mode}`,
    game: (slug?:string) => `${baseURL}/api/games/${slug}`,
}