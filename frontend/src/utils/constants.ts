
export const InitialGamesFilters: GamesFiltersT = {
    page: 1,
    language: "all",
    query: "",
    voice_acting_language: "all",
    platform: "all" as PlatformT,
    minimum_rating: 0,
    offline_play_mode: "all",
    online_play_mode: "all",
    limit: 5,
    order: "release_date"
}


export const languageOptions = [
    { value: "all", label: "All" },
    { value: "english", label: "English" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
]
export const orderOptions = [
    { value: "-rating", label: "Rating (Heighest rating value)" },
    { value: "rating", label: "Rating (Heighest rating value)" },
    { value: "-release_date", label: "Release date (Newest first)" },
    { value: "'release_date", label: "Release date (Oldest first)" },
]
export const limitOptions = [
    { value: 5, label: "5 games" },
    { value: 10, label: "10 games" },
    { value: 15, label: "15 games" },
]
enum PlatformsEnum {
    all = "all",
    Google_Stadia = "Google Stadia",
    Linux = "Linux",
    Mac = "Mac",
    Xbox_One = "Xbox One",
    PlayStation_5 = "PlayStation 5",
    PlayStation_4 = "PlayStation 4",
    Nintendo_Switch = "Nintendo Switch",
    Xbox_Series = "Xbox Series X|S",
    C_Microsoft_Windows = "PC (Microsoft Windows)",
}

const platforms = Object.values(PlatformsEnum);

export const platformsOptions = Array.from({ length: platforms.length }, (_, i) => ({
    value: platforms[i],
    label: platforms[i],
}))