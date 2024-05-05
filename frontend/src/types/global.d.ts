type PlatformT = "all" | "Linux" | "Mac" | "Xbox One" | "Xbox Series X|S" | "Google Stadia" | "PC (Microsoft Windows)" | "Sega Mega Drive/Genesis" | "DOS" | "Mega-CD/Sega CD" | "Game Gear" | "Sega Saturn" | "GameCube" | "Gizmondo" | "PlayStation" | "PlayStation 2" | "PlayStation 3" | "PlayStation 4" | "PlayStation 5" | "PlayStation Portable" | "PlayStation Vita" | "Nintendo Switch" | "3DO Interactive Multiplayer" | "Microsoft Windows" | "iOS" | "Java Platform" | "Micro Edition" | "Android" | "Xbox 360" | "Xbox" | "Xbox One" | "Xbox Series X" | "Windows Phone" | "macOS" | "Zeebo" | "Stadia";


type UserT = {
    id: number;
    username: string;
}

type AuthContextT = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

type MediaT = {
    id: number;
    image: string;
    title: string;
}

type MediaContextT = {
    media: MediaT[];
    setMedia: (media: MediaT[]) => void;
}



type MethodT = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";



type PlayModeT = "all" | "single-player" | "multi-player";

type LanguageT = "all" | "english" | "russian" | "japanese";

type GamesFiltersT = {
    page: number;
    query: string;
    limit: number;
    order: "rating" | "-rating" | "release_date" | "-release_date";
    language: LanguageT;
    voice_acting_language: LanguageT;
    platform: PlatformT
    minimum_rating: number;
    offline_play_mode: PlayModeT;
    online_play_mode: PlayModeT;
}

type GameT = {
    id: number;
    cover: string;
    slug: string;
    title: string;
    description: string;
    release_date: string;
    platforms: PlatformT[];
    genres: string[];
    developers: string[];
    played_count: number;
    want_to_play_count: number;
    playing_count: number;
    rating: number[];
    total_ratings: number;
    rating_average: number;
    voice_acting: LanguageT[];
    screenshots: string[];
    offline_mode: PlayModeT[];
    online_mode: PlayModeT[];
    available_languages: LanguageT[];
    social_sites: {
        title: "Official website" | "Wikipedia" | "Youtube" | "X";
        url: string;
    }[]
}