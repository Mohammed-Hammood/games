import { NextRequest, NextResponse } from "next/server";
import { gamesList } from "../games";

type Props = {
    params: {
        game_slug?: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const game_slug = params.game_slug;

    const game =game_slug ?  gamesList.find(item => game_slug == item.slug) : null;

    if (game) {
        const origin = req.nextUrl.origin;
        game.cover = origin + game.cover;
        game.screenshots = game.screenshots.map(s => origin + s);
        return NextResponse.json({
            ok: true,
            game,
        })
    }

    return NextResponse.json({
        ok:false,
        status: 404,
        error: 'Game not found',
    })
} 