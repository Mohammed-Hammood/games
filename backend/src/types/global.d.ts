
type GameT = {
    id:number;
    image:string;
    title:string;
    description:string;
    initial_release: string;
    platforms: string[];
    genres: string[];
    developers: string[];
    played_count: number;
    want_to_play_count: number;
    playing_count:number;
    rating: number[];
    screenshots: string[];
    offline_mode: {
        mode: "single-player" | "multi-player";
    };
    online_mode: {
        mode: "single-player" | "multi-player";
    };
    available_languages: string[];
    social_sites: {
        title: string;
        url:string;
    }[]
}