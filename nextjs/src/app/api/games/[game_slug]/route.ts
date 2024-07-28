import { NextRequest, NextResponse } from "next/server";
import { getGameBySlug } from "@/server";

type Props = {
    params: {
        game_slug?: string
    }
}

export async function GET(req: NextRequest, { params }: Props) {
    const game_slug = params.game_slug;

    const game_ = getGameBySlug(game_slug ?? '');

    if (game_) {
        const origin = req.nextUrl.origin;
        const game = {
            ...game_,
            cover: origin + game_.cover,
            screenshots: game_.screenshots.map(s => origin + s),
        }
        return NextResponse.json({
            ok: true,
            game,
            origin,
        })
    }

    return NextResponse.json({
        ok: false,
        status: 404,
        error: 'Game not found',
    })
} 