
const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: "<button id='page' class='tui-page-btn page-btn'>{{page}}</button>",
    currentPage: '<button id="page" class="tui-page-btn tui-is-selected active-page-btn">{{page}}</button>',
    moveButton: '<button id="page" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</button>',
    moreButton: '<button id="page" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</button>',
    disabledMoveButton:
      '<button id="page" class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<button  class="tui-ico-{{type}}">{{type}}</button>' +
      '</button>',
  }
}

function getTotalPages(dataObj) {
  return dataObj.total_pages;
}

export { options, getTotalPages }