

// Инициализация Яндекс.Карт
ymaps.ready(initMap);

function initMap() {
    const map = new ymaps.Map('map', {
        center: [53.908856, 27.556720], // Центр карты (Москва, для примера)
        zoom: 11, // Масштаб карты
    });

    // Метка для загса
    const registryOfficeMarker = new ymaps.Placemark(
        [53.908856, 27.556720], // Координаты загса
        {
            hintContent: 'Загс', // Подсказка
            balloonContent: '<h3>Загс</h3><p>Здесь будет роспись</p>', // Балун
        },
        {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Иконка для загса
            iconImageSize: [40, 40], // Размер иконки
            iconImageOffset: [-20, -40], // Смещение иконки
        }
    );

    // Метка для банкета
    const banquetMarker = new ymaps.Placemark(
        [53.947724, 27.644710], // Координаты банкета
        {
            hintContent: 'Банкет', // Подсказка
            balloonContent: '<h3>Банкет</h3><p>Здесь будет праздник</p>', // Балун
        },
        {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Иконка для банкета
            iconImageSize: [40, 40], // Размер иконки
            iconImageOffset: [-20, -40], // Смещение иконки
        }
    );

    // Добавляем метки на карту
    map.geoObjects.add(registryOfficeMarker);
    map.geoObjects.add(banquetMarker);

    // Открываем балун при клике на метку
    registryOfficeMarker.events.add('click', function () {
        registryOfficeMarker.balloon.open();
    });

    banquetMarker.events.add('click', function () {
        banquetMarker.balloon.open();
    });
}

// Функция для отображения/скрытия карты
function toggleMap() {
    const map = document.getElementById('map');
    if (map.style.display === 'none') {
        map.style.display = 'block';
        scrollToMap();
    } else {
        map.style.display = 'none';
    }
}

function scrollToMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' }); // Плавная прокрутка
    }
}


window.onload = function() {
    setTimeout(() => {
        window.scrollTo(0, 0); // Прокручиваем страницу вверх через 100 мс
    }, 100);
};

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Отменяем стандартную отправку формы

            // Получаем данные из формы
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            // Выводим данные в консоль (или отправляем на сервер)
            console.log('Имя:', name);
            console.log('Сообщение:', message);

            // Очищаем форму
            feedbackForm.reset();

            // Показываем уведомление
            alert('Спасибо за ваше сообщение!');
        });
    }
});

document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;

    const data = { name, message, attendance };

    fetch('https://script.google.com/macros/s/AKfycbxlReq-_T27icdzsvVZDPK6S_QxBbTiy8P78G4C4gmWlyfLwRfbwVJryInKwFIHFNpk/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors' // Отключаем CORS
    })
    // .then(() => {
    //     alert('Сообщение отправлено!');
    //     document.getElementById('feedback-form').reset();
    // })
    // .catch(error => {
    //     console.error('Ошибка:', error);
    //     alert('Ошибка при отправке сообщения.');
    // });
});