import fetchData from './js/pixabay-api';
import renderPhoto, {
  clearGallery,
  showLoader,
  hideLoader,
  simplelightbox,
  refreshSlb,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// //find elements set all relations to elements
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const input = form.elements[0];
input.classList.add('input');
const btn = form.elements[1];
btn.classList.add('button');
const loadMoreBtn = document.querySelector('.load-more-btn');
let page = null;
let totalPages = null;
let query = null;

form.addEventListener('submit', makeGallery);
function makeGallery(event) {
  event.preventDefault();
    clearGallery(gallery);
    hideLoadMoreButton();
  showLoader();
  query = input.value;
  page = 1;
  if (query === '') {
    hideLoader();
    iziToast.error({
      message: 'Write your something you want to see',
      position: 'topRight',
    });
    return;
  }
  fetchData(query, page)
    .then(response => {
      // перевірка успішного запиту на порожній масив зображень
      if (response.data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        hideLoadMoreButton();
        return;
      } else {
        renderPhoto(gallery, response.data.hits);
        totalPages = Math.ceil(response.data.totalHits / 15);
        if (page < totalPages) {
          showLoadMoreButton();
        } else {
          iziToast.info({
            position: 'bottomCenter',
            message: `We're sorry, but you've reached the end of search results.`,
          });
        }
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Bad request',
        position: 'topRight',
      });
      return;
    })
    .finally(() => {
      hideLoader();
      input.value = '';
    });
}

loadMoreBtn.addEventListener('click', event => {
  event.preventDefault();
  hideLoadMoreButton();
  showLoader();
  page += 1;
  fetchData(query, page)
      .then(response => {
        renderPhoto(gallery, response.data.hits);
      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          position: 'bottomCenter',
          message: `We're sorry, but you've reached the end of search results.`,
        });
      }
      
    })
    .catch(() => {
      iziToast.error({
        message: 'Bad request',
        position: 'topRight',
      });
      return;
    })
    .finally(() => {
      hideLoader();
    });
});
