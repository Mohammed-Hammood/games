import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "utils";
import HomePage from "./home";
import GamePage from "./game";
import Error404 from "./404";

export default function Pages() {
    return (
        <Routes>
            <Route element={<HomePage />} path={AppRoutes.home} />
            <Route element={<GamePage />} path={AppRoutes.game()} />
            <Route element={<Error404 />} path={AppRoutes.all} />
        </Routes>
    )
}