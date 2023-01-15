import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

function galleryCreateImage(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
        `;
        })
        .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryCreateImage(galleryItems));

galleryEl.addEventListener('click', onGalleryClickImage);

function onGalleryClickImage(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(
        `
    <img src='${e.target.dataset.source}'>
`,
        {
            onShow: instance => {
                galleryEl.addEventListener('keydown', escModalClose);
            },

            onClose: instance => {
                galleryEl.removeEventListener('keydown', escModalClose);
            },
        },
    );

    instance.show();

    // функція закривання модалку при натисканні клавіші ESC
    function escModalClose(e) {
        const ESC_KEY_CODE = 'Escape';

        if (e.key === ESC_KEY_CODE) {
            instance.close();
        }
    }
}
