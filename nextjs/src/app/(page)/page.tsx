import { HomePage } from "@/pages_";
import { getGamesByFilters } from "@/server";
import { InitialGamesFilters } from "@/utils";

export default function Home() {
    const data = getGamesByFilters({ ...InitialGamesFilters, min: 0, max: 5 })

    return (
        <main className={'w-full'}>
            {<HomePage data={data}/>}
        </main>
    );
}
