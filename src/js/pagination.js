const container = document.getElementById('pagination');

function getPaginationOptions(data) {
  return {
    totalItems: getTotalPages(data),
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };
}
function getTotalPages(dataObj) {
  return dataObj.total_pages;
}

export { container, getPaginationOptions, getTotalPages };
