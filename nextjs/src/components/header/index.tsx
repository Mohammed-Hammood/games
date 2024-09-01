"use client"

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { AppRoutes } from '@/utils';
import { FaMagnifyingGlass, FaRobot } from "react-icons/fa6";
import { MdClear } from "react-icons/md";


export function Header() {
    const querySearch = useSearchParams().get("query") ?? ''
    
    const [query, setQuery] = useState<string>(querySearch)
    const router = useRouter()

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const q = query.trim()

        if(q.length > 0){
            router.push(`${AppRoutes.home}/?query=${q}`)
        }

    }
    
    const clear = () => {
        setQuery("")
        router.push(AppRoutes.home)
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



