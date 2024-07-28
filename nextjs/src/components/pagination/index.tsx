"use client"
import cls from "./pagination.module.scss";
import ReactPaginate from "react-paginate"
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

type Props = {
    filters: GamesFiltersT;
    games_count: number
    setFilters: (filters: GamesFiltersT) => void
}

export function Pagination({filters, games_count, setFilters }: Props) {
    const { limit, page } = filters;
    const pageCount = Math.ceil(games_count / limit);

    const setPage = ({ selected }: { selected: number }) => {

        if (page !== selected + 1) {
            setFilters({ ...filters, page: selected + 1 });
        }
    }
    return (
        <ReactPaginate
            pageCount={pageCount}
            className={cls.pagination}
            activeClassName={cls.activePage}
            pageClassName={cls.page}
            nextClassName={cls.page}
            disabledClassName={cls.disabledPage}
            previousClassName={cls.page}
            previousLabel={<FaAnglesLeft />}
            nextLabel={<FaAnglesRight />}
            initialPage={page - 1}
            onPageChange={setPage}
            breakClassName={cls.break}
        />
    )
}