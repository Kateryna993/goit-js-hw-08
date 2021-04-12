// Задание
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне. Превью результата посмотри по ссылке.

// Разбей задание на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>  */

import galleryItems from './gallery-items.js';

// console.log(ArrayItems);

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  
  lightboxModal: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
};

// console.log(refs.lightboxCloseBtn);

// console.log(createGalleryMarkup(ArrayItems));

// Создание и добавление разметки

const galleryMarkup = createGalleryMarkup(galleryItems);


refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
  })
  .join('')
};
//   return markup;
  
//   console.log(galleryItems[0]); 
//     // первая карточка, длинна массива markup.length
// }
// Делегирование и открытие модалки

refs.galleryContainer.addEventListener('click', onModalOpen);

function onModalOpen(event) {

    event.preventDefault();

    // console.log(event.target.alt)

   if (event.target.classList.contains('gallery__image')) {
    refs.lightboxModal.classList.toggle('is-open');
    refs.lightboxImg.src = event.target.dataset.source;
    refs.lightboxImg.alt = event.target.alt;
   } 

    console.log(refs.lightboxImg)

    window.addEventListener('keydown', onEscKeyPress)

}

refs.lightboxModal.addEventListener('click', onModalClose);

// 

function onModalClose(event) {

    const btnEl = event.target === refs.lightboxCloseBtn;

    const overlayEl = event.target === refs.lightboxOverlay;


    if (btnEl || overlayEl) {
        refs.lightboxModal.classList.toggle('is-open');
        refs.lightboxImg.src = "";
    }

    console.log(event.target);

}

// window.addEventListener('keydown', onEscKeyPress)

function onEscKeyPress(event) { 
    
    console.log(event)
    if (event.code === 'Escape') {
        refs.lightboxModal.classList.toggle('is-open');
        refs.lightboxImg.src = "";
    }

    window.removeEventListener('keydown', onEscKeyPress);

}

