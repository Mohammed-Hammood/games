import cls from './footer.module.scss';


export function Footer() {

    return (
        <footer className={cls.wrapper}>
            <div className={cls.emailText}>Get help at games@mail.com</div>
            <div className={cls.copyrightText}>
                {"Copyright © 2024 Games Ltd. \nAll rights reserved."}
            </div>
        </footer>
    )
}
