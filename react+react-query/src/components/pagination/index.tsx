import cls from "./pagination.module.scss";
import ReactPaginate from "react-paginate"
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useFilters } from "components/hooks";


export function Pagination({ games_count }: {
    games_count: number,
}) {
    const { filters, setFilters } = useFilters();
    const { limit, page } = filters;
    
    const pageCount = Math.ceil(games_count / limit);

    const setPage = ({ selected }: { selected: number }) => {

        if (page !== selected + 1) {
            setFilters({ ...filters, page: selected + 1 })
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