import { Pagination } from "react-bootstrap";

function PaginationHandler (props) {
    let pages = [];
    const numResults = 10;
  
    const totalPages = Math.ceil(props.categoryData.length / numResults);
    const lastPage = totalPages;
  
    const paginationStart = props.activePage === 1 ? 1 : props.activePage - 1;
    const paginationEnd = props.activePage === lastPage ? lastPage : props.activePage + 1;
  
    for (
      let PageNumber = paginationStart;
      PageNumber <= paginationEnd;
      PageNumber++
    ) {
      pages.push(
      <Pagination.Item
          onClick={() => props.setActivePage(PageNumber)}
          key={PageNumber}
          active={PageNumber === props.activePage}
        >
          {PageNumber}
        </Pagination.Item>
      );
    }
return (
    <Pagination className="mt-4 pagination justify-content-center">
    <Pagination.First onClick={() => props.setActivePage(1)} />
    {pages}
    <Pagination.Last onClick={() => props.setActivePage(lastPage)} />
  </Pagination>
)
}

export default PaginationHandler