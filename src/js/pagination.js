
const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
}

function getTotalPages(dataObj) {
  return dataObj.total_pages;
}

export {options, getTotalPages}