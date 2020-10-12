// модуль, который работает с формой редактирования изображения.
'use strict';

(function () {
    var scaleLine = document.querySelector('.scale__line')
    var scalePinHendler = scaleLine.querySelector('.scale__pin')
    var scaleLevelHendler = scaleLine.querySelector('.scale__level')
    var imgUploadPreview = document.querySelector('.img-upload__preview')
    var effectChrome = document.querySelector('.effects__preview--chrome')
    var effectSepia = document.querySelector('.effects__preview--sepia')
    var effectMarvin = document.querySelector('.effects__preview--marvin')
    var effectPhobos = document.querySelector('.effects__preview--phobos')
    var effectHeat = document.querySelector('.effects__preview--heat')
    var effectNone = document.querySelector('.effects__preview--none')
    var ImgUploadScale = document.querySelector('.img-upload__scale')
    
    // Фильтры
    var filters = {
        grayscale: 'grayscale',
        sepia: 'sepia',
        invert: 'invert',
        blur: 'blur',
        brightness: 'brightness',
    }

    var currentFilter = null

    // Функция перемещения ползунка в начало и очистка фильтров
    function clearFilter() {
        scalePinHendler.style.left = 0;
        scaleLevelHendler.style.width = 0;
        imgUploadPreview.style.filter = 'none';
        ImgUploadScale.classList.remove('hidden');
    }

    // Функцию, задающие currentFilter
    // Нажатине на "стандартний" фильтр
    effectNone.addEventListener('click', function () {
        currentFilter = null;
        clearFilter()
        ImgUploadScale.classList.add('hidden');
    })

    // Фильтр хром
    effectChrome.addEventListener('click', function () {
        currentFilter = filters.grayscale;
        clearFilter()
    })

    // Фильтр сепия
    effectSepia.addEventListener('click', function () {
        currentFilter = filters.sepia;
        clearFilter()
    })

    // Фильтр марвин
    effectMarvin.addEventListener('click', function () {
        currentFilter = filters.invert;
        clearFilter()
    })

    // Фильтр фобос
    effectPhobos.addEventListener('click', function () {
        currentFilter = filters.blur;
        clearFilter()
    })

    // Фильтр зной
    effectHeat.addEventListener('click', function () {
        currentFilter = filters.brightness;
        clearFilter()
    })


    // Перемещение ползунка фильтров
    scalePinHendler.onmousedown = function (evt) {
        evt.preventDefault(); // предотвратить запуск выделения (действие браузера)

        var shiftX = evt.clientX - scalePinHendler.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);



        function onMouseMove(evt) {
            var newLeft = evt.clientX - shiftX - scaleLine.getBoundingClientRect().left;
            // курсор вышел из слайдера => оставить бегунок в его границах.

            if (newLeft < 0) {
                newLeft = 0;
            }
            var rightEdge = scaleLine.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            scalePinHendler.style.left = newLeft + 'px';
            scaleLevelHendler.style.width = scalePinHendler.style.left
            var percentValue = (newLeft / rightEdge) * 100

            // Ранее при клике на фильтр было передано определенное значение в currentFilter, которое и будет меняться
            if (currentFilter === null) {
                imgUploadPreview.style.filter = 'none'
            }

            if (currentFilter === 'grayscale') {
                imgUploadPreview.style.filter = 'grayscale(' + percentValue + '%)'
            }

            if (currentFilter === 'sepia') {
                imgUploadPreview.style.filter = 'sepia(' + percentValue + '%)'
            }

            if (currentFilter === 'invert') {
                imgUploadPreview.style.filter = 'invert(' + percentValue + '%)'
            }

            if (currentFilter === 'blur') {
                imgUploadPreview.style.filter = 'blur(' + percentValue * 0.1 + 'px)'
            }

            if (currentFilter === 'brightness') {
                imgUploadPreview.style.filter = 'brightness(' + percentValue * 2 + '%)'
            }
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };

    scalePinHendler.ondragstart = function () {
        return false;
    };
})()
