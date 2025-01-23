import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'utils';
import { FaMagnifyingGlass, FaRobot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { useFilters } from 'components';


export function Header() {
    const [query, setQuery] = useState<string>('');
    const { filters, setFilters, resetFilters } = useFilters()
    const navigate = useNavigate()

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const q = query.trim();

        if (q.length > 0 && query) {
            navigate(AppRoutes.home);

            setFilters({
                ...filters,
                query: q,
                page: 1,
            });

        }
    }
    const clear = () => {

        setQuery("");

        if (filters.query.length > 0) {
            navigate(AppRoutes.home);
            resetFilters();
        }
    }

    return (
        <>
            <header className={styles.wrapper}>
                <Link to={AppRoutes.home} className={styles.logo}>
                    <FaRobot title="Games" />
                </Link>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div></div>
                    <button type='button' className={styles.clearButton} onClick={clear} title='Search'>
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



