import { Link } from "react-router-dom";
import cls from "./404.module.scss";
import { AppRoutes } from "utils";


function Error404() {

    return (
        <main className={cls.main}>
            <div className={cls.centerContent}>
                <div className={cls.card}>
                        <h3>{"Page not found"}</h3>
                        <Link to={AppRoutes.home} >
                            Home
                        </Link>
                </div>
            </div>
        </main>
    )
}


export default Error404;