let indexImage = null;

const zoomJavascript = {
    init: () => {
        document.addEventListener('DOMContentLoaded', () => {
            zoomJavascript.handleEvents();
        });
    },

    element: () => {
        return {
            arrayImageZooms: Array.from($$('.item-image-upload')),
            wrapperImageZoom: $('.view-image-zoom'),
            wallperWrapper: $('.wallper-wrapper'),
            wallperWrapperView: $('.wallper-wrapper-view'),
            viewImageListBelow: $('.view-image-lists'),
            itemImageBelow: $$('.item-image-below'),
        };
    },

    structZoomImage: (index) => {
        const elements = zoomJavascript.element();

        indexImage = index;
        zoomJavascript.handleZoomButtonClick(elements.wrapperImageZoom, 'add');
        zoomJavascript.attachSrcImageZoom(elements.arrayImageZooms[indexImage]?.src, elements.wallperWrapper, elements.wallperWrapperView);
        zoomJavascript.showImagesBelow();
        zoomJavascript.activeImageBelow(elements.itemImageBelow);
    },

    attachSrcImageZoom: (src, wrapper1, wrapper2) => {
        wrapper1.src = wrapper2.src = src;
    },

    activeImageBelow: () => {
        const elements = zoomJavascript.element();

        elements.itemImageBelow.forEach((e) => { RootTypeClass.class('remove', e, 'select'); });
        RootTypeClass.class('add', elements.itemImageBelow[indexImage], 'select');
    },

    handleZoomButtonClick: (wrapper, type) => {
        if (type == 'add')
            RootTypeClass.class('add', wrapper, 'zoom');
        else 
            RootTypeClass.class('remove', wrapper, 'zoom');
    },

    handleClickNextAndPrev: (type) => {
        const elements = zoomJavascript.element();

        if (type === 'next') {
            indexImage = Math.min(indexImage + 1, elements.arrayImageZooms.length - 1);
        } else if (type === 'prev') {
            indexImage = Math.max(indexImage - 1, 0);
        }

        zoomJavascript.attachSrcImageZoom(elements.arrayImageZooms[indexImage]?.src, elements.wallperWrapper, elements.wallperWrapperView);
        zoomJavascript.activeImageBelow();
    },

    updateImageSources(images, array) {
        images.forEach((img, index) => {
            if (index < array.length) {
                img.src = array[index].src;
            }
        });
    },

    showImagesBelow: () => {
        const elements = zoomJavascript.element();

        const html = elements.arrayImageZooms.reduce((result, image) => {
            return (
                result + `
                <img class="item-image-below" src="${image.src}" title=""/>
            `
            );
        }, "");
        elements.viewImageListBelow.innerHTML = html;

        const arrayImages = elements.viewImageListBelow.querySelectorAll('img');
        zoomJavascript.updateImageSources(arrayImages, elements.arrayImageZooms);

        $$('.item-image-below').forEach((image, index) => {
            image.addEventListener('click', () => {
                indexImage = index;
                zoomJavascript.attachSrcImageZoom(elements.arrayImageZooms[index].src, elements.wallperWrapper, elements.wallperWrapperView);
                zoomJavascript.activeImageBelow();
            });
        });
    },

    handleEvents: () => {
        const elements = zoomJavascript.element();

        $$('.fn-more-zoom').forEach((btn, index) => {
            const elements = zoomJavascript.element();
           
            btn.addEventListener('click', () => {
                indexImage = index;
                zoomJavascript.handleZoomButtonClick(elements.wrapperImageZoom, 'add');
                zoomJavascript.attachSrcImageZoom(elements.arrayImageZooms[index].src, elements.wallperWrapper, elements.wallperWrapperView);
                zoomJavascript.showImagesBelow();
                zoomJavascript.activeImageBelow();
            });
        });

        $('.btn-close-zoom').addEventListener('click', () => {
            zoomJavascript.handleZoomButtonClick(elements.wrapperImageZoom, 'remove');
        });

        $('.btn-prev-zoom-img')?.addEventListener('click', () => zoomJavascript.handleClickNextAndPrev('prev'));
        $('.btn-next-zoom-img')?.addEventListener('click', () => zoomJavascript.handleClickNextAndPrev('next'));
    },

    start: () => {
        zoomJavascript.handleEvents();
    }
};

zoomJavascript.start();