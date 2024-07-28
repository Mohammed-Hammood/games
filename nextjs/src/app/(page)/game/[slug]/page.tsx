import { getGameBySlug } from "@/server";
import Client from "./client";

export default async function GamePage({
    params: {
        slug
    }
}: Readonly<{
    params: {
        slug: string
    }
}>) {
    const game = getGameBySlug(slug)

    return (
        <Client params={{ slug, }} game={game} />
    );
}
