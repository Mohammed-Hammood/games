import Link  from "next/link";
import cls from "./404.module.scss";

function Error404() {

    return (
        <main className={cls.main}>
            <div className={cls.centerContent}>
                <div className={cls.card}>
                        <h3>{"Page not found"}</h3>
                        <Link href={'/'} >
                            Home
                        </Link>
                </div>
            </div>
        </main>
    )
}


export default Error404;