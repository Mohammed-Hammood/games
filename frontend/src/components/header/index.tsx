import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'utils';
import { selectGames, setGamesFilters, useAppDispatch, useAppSelector } from 'store';
import { FaMagnifyingGlass, FaRobot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";


export function Header() {
    const { filters } = useAppSelector(selectGames);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<string>(filters.query);
    const navigate = useNavigate()

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (query.trim().length > 0 && query !== filters.query) {
            dispatch(setGamesFilters({ ...filters, query: query.trim() }));
            navigate("/");
        }
    }
    const clear = () => {
        setQuery("");
        if (filters.query.length > 0) {
            dispatch(setGamesFilters({ ...filters, query: ""}));
        }
    }
    return (
        <>
            <header className={styles.wrapper}>
                <Link to={AppRoutes.home} className={styles.logo}>
                    <FaRobot title="Games" />
                </Link>
                <form onSubmit={submitHandler} className={styles.form}>
                    <button type='button' className={styles.clearButton} onClick={clear}>
                        <MdClear />
                    </button>
                    <input
                        type='text'
                        placeholder='Search...'
                        className={styles.searchInput}
                        onChange={e => setQuery((e.target as HTMLInputElement).value)}
                        value={query}
                    />
                    <button type='submit' className={styles.searchButton} title='Clear the search text'>
                        <FaMagnifyingGlass />
                    </button>
                </form>

            </header>

        </>
    );
}



