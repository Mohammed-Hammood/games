import cls from './footer.module.scss';

export function Footer(): JSX.Element {
    return (
        <footer className={cls.wrapper}>
            <div className={cls.emailText}>
                <span>Get help at</span>
                <a href='mailto:help@games.com'>help@games.com</a>
            </div>
            <div className={cls.copyrightText}>
                <span>Copyright © 2024 Games Ltd</span>
                <span>All rights reserved.</span>
            </div>
        </footer>
    )
}
