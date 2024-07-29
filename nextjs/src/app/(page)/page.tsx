import { HomePage } from "./_home";
import { getGamesByFilters } from "@/server";
import { InitialGamesFilters } from "@/utils";

export default function Home() {
    const data = getGamesByFilters({ ...InitialGamesFilters, min: 0, max: 5 })

    return (
        < HomePage data={data} />
    );
}
