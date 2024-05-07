
export const AppRoutes = {
    home: "/",
    game: (slug: string = ":slug") => `game/${slug}`,
    all: "*",
}