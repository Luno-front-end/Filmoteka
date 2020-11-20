import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import request from './apiRequest';
// const options = {
//   totalItems: getTotalPages(data),
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: 1,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
// };

const container = document.getElementById('pagination');
// const pagination = new Pagination(container, getPaginationOptions(data));

function getPaginationOptions(data) {
  return {
    totalItems: getTotalPages(data),
    itemsPerPage: 20,
    visiblePages: 5,
    page: getCurrentPage(data),
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };
}
function getTotalPages(dataObj) {
  return dataObj.total_pages;
}
function getCurrentPage(dataObj) {
  return dataObj.page;
}

export { container, getPaginationOptions };
