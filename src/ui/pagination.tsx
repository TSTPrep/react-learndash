import ReactPaginate from 'react-paginate';

type PaginationProps = {
    handlePageClick?: (selectedItem: { selected: number }) => void;
    pageCount: number;
    focusPage?: number;
};

const Pagination = ({ handlePageClick, pageCount, focusPage }: PaginationProps) => {
    return (
        <ReactPaginate
            nextLabel={
                <>
                    <i className='icon-east'></i>
                </>
            }
            onPageChange={handlePageClick}
            forcePage={focusPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={
                <>
                    <i className='icon-west'></i>
                </>
            }
            pageClassName='page-items'
            pageLinkClassName='page-links'
            previousClassName='page-items'
            previousLinkClassName='page-links'
            nextClassName='page-items'
            nextLinkClassName='page-links'
            breakLabel='...'
            breakClassName='page-items'
            breakLinkClassName='page-links'
            containerClassName='edu-pagination'
            activeClassName='active'
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
