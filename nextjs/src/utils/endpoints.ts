

export const Endpoints = {
    games: ({ limit, page, query, language, order, platform, voice_acting_language, offline_play_mode, online_play_mode }: GamesFiltersT) => `/api/games?query=${query}&page=${page}&language=${language}&order=${order}&limit=${limit}&platform=${platform}&voice_acting_language=${voice_acting_language}&offline_play_mode=${offline_play_mode}&online_play_mode=${online_play_mode}`,
    game: (slug?: string) => `/api/games/${slug}`,
}