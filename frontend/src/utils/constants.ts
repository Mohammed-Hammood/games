
export const InitialGamesFilters: GamesFiltersT = {
    page: 1,
    language: "all",
    query: "",
    voice_acting_language: "all",
    platform: "all",
    minimum_rating: 0,
    offline_play_mode: "all",
    online_play_mode: "all",
    limit: 5,
    order: "-release_date"
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

export const platformsOptions: { value: PlatformT, label: string }[] = [
    { value: "all", label: "all" },
    { value: "PC (Microsoft Windows)", label: "PC (Microsoft Windows)" },
    { value: "Linux", label: "Linux" },
    { value: "Mac", label: "Mac" },
    { value: "Android", label: "Android" },
    { value: "iOS", label: "iOS" },
    { value: "PlayStation", label: "PlayStation" },
    { value: "PlayStation 2", label: "PlayStation 2" },
    { value: "PlayStation 3", label: "PlayStation 3" },
    { value: "PlayStation 4", label: "PlayStation 4" },
    { value: "PlayStation 5", label: "PlayStation 5" },
    { value: "Google Stadia", label: "Google Stadia" },
    { value: "PlayStation Portable", label: "PlayStation Portable" },
    { value: "PlayStation Vita", label: "PlayStation Vita" },
    { value: "Xbox", label: "Xbox" },
    { value: "Xbox One", label: "Xbox One" },
    { value: "Xbox 360", label: "Xbox 360" },
    { value: "Xbox Series X|S", label: "Xbox Series X|S" },
    { value: "Nintendo Switch", label: "Nintendo Switch" },
    { value: "Sega Mega Drive/Genesis", label: "Sega Mega Drive/Genesis" },
    { value: "DOS", label: "DOS" },
    { value: "Mega-CD/Sega CD", label: "Mega-CD/Sega CD" },
    { value: "Game Gear", label: "Game Gear" },
    { value: "Sega Saturn", label: "Sega Saturn" },
    { value: "GameCube", label: "GameCube" },
    { value: "Gizmondo", label: "Gizmondo" },
    { value: "3DO Interactive Multiplayer", label: "3DO Interactive Multiplayer" },
    { value: "Java Platform", label: "Java Platform" },
    { value: "Micro Edition", label: "Micro Edition" },
    { value: "Windows Phone", label: "Windows Phone" },
    { value: "Zeebo", label: "Zeebo" },
    { value: "Stadia", label: "Stadia" },
]
