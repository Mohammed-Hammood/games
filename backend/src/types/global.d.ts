type PlatformT ="all" | "Google Stadia"| "Linux" | "Mac" | "Xbox One" | "PlayStation 5" | "Nintendo Switch" | "Xbox Series X|S" | "PC (Microsoft Windows)" | "PlayStation 4";

type PlayModeT = "all" | "single-player" | "multi-player";

type LanguageT = "all" | "english" | "russian" | "japanese";

type GameT = {
    id:number;
    cover:string;
    title:string;
    description:string;
    release_date: string;
    platforms: PlatformT[];
    genres: string[];
    developers: string[];
    played_count: number;
    want_to_play_count: number;
    playing_count:number;
    rating: number[];
    total_ratings:number;
    rating_average:number;
    voice_acting: LanguageT[];
    screenshots: string[];
    offline_mode: PlayModeT[];
    online_mode: PlayModeT[];
    available_languages: LanguageT[];
    social_sites: {
        title: "Official website" | "Wikipedia" | "Youtube" | "X";
        url:string;
    }[]
}