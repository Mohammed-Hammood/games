"use client"

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './header.module.scss';
import Link  from 'next/link';
// import {useNavigate}
import { AppRoutes } from '@/utils';
// import { selectFilters, setFilters, useAppDispatch, useAppSelector } from 'store';
import { FaMagnifyingGlass, FaRobot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";


export function Header() {
    // const filters = useAppSelector(selectFilters);
    const [query, setQuery] = useState<string>('');
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate()

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const q = query.trim();

        // if (q.length > 0 && query !== filters.query) {
            // navigate(AppRoutes.home);

            // dispatch(setFilters({
            //     ...filters,
            //     query: q,
            //     page: 1,
            //     redirect: true,
            // }));

        // }
    }
    const clear = () => {

        // setQuery("");

        // if (filters.query.length > 0) {
        //     navigate(AppRoutes.home);

        //     dispatch(setFilters({
        //         ...filters,
        //         query: "",
        //         redirect: true,
        //         page: 1,
        //     }));
        // }
    }
    return (
        <>
            <header className={styles.wrapper}>
                <Link href={AppRoutes.home} className={styles.logo}>
                    <FaRobot title="Games" />
                </Link>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div></div>
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



