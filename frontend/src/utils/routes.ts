
export const AppRoutes = {
    home: "/",
    game: (slug: string = ":slug") => `${slug}`,
    all: "*",
}