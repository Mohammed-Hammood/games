
const baseURL = process.env.NODE_ENV === 'production' || 0 ? 'https://backend-api-games.vercel.app/api' :  `http://localhost:3001/api`;


export const Endpoints = {
    baseURL,
    games: ({ limit, page, query, language, order, platform, voice_acting_language, offline_play_mode, online_play_mode }: GamesFiltersT) => `${baseURL}/games?query=${query}&page=${page}&language=${language}&order=${order}&limit=${limit}&platform=${platform}&voice_acting_language=${voice_acting_language}&offline_play_mode=${offline_play_mode}&online_play_mode=${online_play_mode}`,
    game: (slug?:string) => `${baseURL}/games/${slug}`,
}