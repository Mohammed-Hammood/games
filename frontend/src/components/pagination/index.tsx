import cls from "./pagination.module.scss";
import ReactPaginate from "react-paginate"
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { selectGames, setGamesFilters, useAppDispatch, useAppSelector } from 'store';


export function Pagination() {
    const { filters, games_count, loading } = useAppSelector(selectGames);
    const dispatch = useAppDispatch();
    const pageCount = Math.ceil(games_count / filters.limit);

    const setPage = ({ selected }: { selected: number }) => {
        if(filters.page !== selected + 1){
1
            dispatch(setGamesFilters({ ...filters, page: selected + 1 }));
        }
    }
    return (
        <ReactPaginate
            className={cls.pagination}
            pageCount={pageCount}
            activeClassName={cls.activePage}
            pageClassName={cls.page}
            nextClassName={cls.page}
            disabledClassName={cls.disabledPage}
            previousClassName={cls.page}
            previousLabel={<FaAnglesLeft />}
            nextLabel={<FaAnglesRight />}
            onPageChange={setPage}
            disableInitialCallback={loading}
            breakClassName={cls.break}
            renderOnZeroPageCount={(loading) ? null : undefined}
        />
    )
}