type PlatformT ="all" | "Google Stadia"| "Mac" | "Xbox One" | "PlayStation 5" | "Nintendo Switch" | "Xbox Series X|S" | "PC (Microsoft Windows)" | "PlayStation 4";

type PlayModeT = "all" | "single-player" | "multi-player";

type GameT = {
    id:number;
    image:string;
    title:string;
    description:string;
    initial_release: string;
    platforms: PlatformT[];
    genres: string[];
    developers: string[];
    played_count: number;
    want_to_play_count: number;
    playing_count:number;
    rating: number[];
    screenshots: string[];
    offline_mode: PlayModeT[];
    online_mode: PlayModeT[];
    available_languages: string[];
    social_sites: {
        title: "Official website" | "Wikipedia" | "Youtube" | "X";
        url:string;
    }[]
}