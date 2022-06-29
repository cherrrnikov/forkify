import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) {
        return;
      }

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev', curPage) +
        this._generateMarkupButton('next', curPage)
      );
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(forward, curPage) {
    return `
        <button data-goto="${
          forward === 'next' ? curPage + 1 : curPage - 1
        }" class="btn--inline pagination__btn--${forward}">
            ${
              forward === 'next'
                ? `<span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>`
                : `<svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
                `
            }
        </button>
        `;
  }
}
export default new PaginationView();
