type PlatformT = "all" | "Linux" | "Mac" | "Xbox One" | "Xbox Series X|S" | "Web browser" | "Google Stadia" | "PC (Microsoft Windows)" | "Sega Mega Drive/Genesis" | "DOS" | "Mega-CD/Sega CD" | "Game Gear" | "Sega Saturn" | "GameCube" | "Gizmondo" | "PlayStation" | "PlayStation 2" | "PlayStation 3" | "PlayStation 4" | "PlayStation 5" | "PlayStation Portable" | "PlayStation Vita" | "Nintendo Switch" | "3DO Interactive Multiplayer" | "Microsoft Windows" | "iOS" | "Java Platform" | "Micro Edition" | "Android" | "Xbox 360" | "Xbox" | "Xbox One" | "Xbox Series X" | "Windows Phone" | "macOS" | "Zeebo" | "Stadia";

type PlayModeT = "all" | "single-player" | "multi-player";

type LanguageT = "all" | "english" | "russian" | "japanese";

type GameT = {
    id: number;
    cover: string;
    title: string;
    slug: string;
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