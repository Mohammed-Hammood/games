enum PlatformT {
    all = "all",
    Google_Stadia = "Google Stadia",
    Linux = "Linux",
    Mac = "Mac",
    Xbox_One = "Xbox One",
    PlayStation_5 = "PlayStation 5",
    PlayStation_4 = "PlayStation 4",
    Nintendo_Switch = "Nintendo Switch",
    Xbox_Series = "Xbox Series X|S",
    PC_Microsoft_Windows = "PC (Microsoft Windows)",
}

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
    slug:string;
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
    rating_average:number;
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