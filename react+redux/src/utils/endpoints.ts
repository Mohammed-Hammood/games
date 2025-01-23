
const baseURL = 'https://games-nextjs.vercel.app/api';
// const baseURL = `http://localhost:3001/api`;


export const Endpoints = {
    baseURL,
    games: ({ limit, page, query, language, order, platform, voice_acting_language, offline_play_mode, online_play_mode }: GamesFiltersT) => `${baseURL}/games?query=${query}&page=${page}&language=${language}&order=${order}&limit=${limit}&platform=${platform}&voice_acting_language=${voice_acting_language}&offline_play_mode=${offline_play_mode}&online_play_mode=${online_play_mode}`,
    game: (slug?: string) => `${baseURL}/games/${slug}`,
}