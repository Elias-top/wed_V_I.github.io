

// Инициализация Яндекс.Карт
ymaps.ready(initMap);

function initMap() {
    const map = new ymaps.Map('map', {
        center: [53.931901, 27.610824],
        zoom: 11, // Масштаб карты
    });

    // Метка для загса
    const registryOfficeMarker = new ymaps.Placemark(
        [53.908856, 27.556720], // Координаты загса
        {
            hintContent: 'ЗАГС Центрального Района', // Подсказка
            balloonContent: '<h3>ЗАГС Центрального Района</h3><p>Место проведения росписи</p> <p>ул. Максима Багдановича, 17А</p>', // Балун
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
            hintContent: 'Ресторан "Зеленый Луг"', // Подсказка
            balloonContent: '<h3>Ресторан "Зеленый Луг"</h3><p>Место проведение банкета </p> <p>ул. Карбышева, 25</p>' , // Балун
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
    const mapElement = document.querySelector('.location');
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
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const lodgingQuestion = document.getElementById("lodging-question");
    const familyMembersSection = document.getElementById("family-members-section");
    const addFamilyMemberButton = document.getElementById("add-family-member");
    const wishesSection = document.getElementById("wishes-section");
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Отмена стандартной отправки формы

            // Получаем данные из формы
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            const attendance = document.querySelector('input[name="attendance"]:checked')?.value;
            const lodging = document.querySelector('input[name="lodging"]:checked')?.value;
            

            // Получаем все имена членов семьи
            const familyMembers = Array.from(document.querySelectorAll('.family-member')).map(input => input.value);

            // Формируем объект данных
            const data = { name, message, attendance, lodging, familyMembers };

            // Отправляем данные на сервер
            fetch('https://script.google.com/macros/s/AKfycbwH3m5ipu_wN1azHXBqAj3nodt3jZWuSvtvKd3tb7F2P3ezV9H1YQvkRsV55i8T90FL/exec', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors'
            })
            .then(() => {
                alert('Спасибо за ваше сообщение!');
                feedbackForm.reset();
                lodgingQuestion.style.display = "none"; // Скрываем блок при очистке формы
                familyMembersSection.style.display = "none"; // Скрываем блок добавления членов семьи при очистке формы
                addFamilyMemberButton.style.display = "none"; // Скрываем кнопку при очистке формы
                wishesSection.style.display = "none";
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке сообщения.');
            });
        });
    }

    // Показать/скрыть блок для ночлега и для добавления членов семьи
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'yes') {
                lodgingQuestion.style.display = "block"; // Показываем вопрос о ночлеге
                addFamilyMemberButton.style.display = "block"; // Показываем кнопку для добавления членов семьи
                wishesSection.style.display = "block";
            } else {
                lodgingQuestion.style.display = "none"; // Скрываем вопрос о ночлеге
                familyMembersSection.style.display = "none"; // Скрываем блок добавления членов семьи
                addFamilyMemberButton.style.display = "none"; // Скрываем кнопку
                wishesSection.style.display = "none";
            }
        });
    });

    // Добавить еще члена семьи
    addFamilyMemberButton.addEventListener('click', () => {
        const familyMembersContainer = document.getElementById('family-members-container');
        
        // Создаем новый блок для поля ввода имени
        const newMemberGroup = document.createElement('div');
        newMemberGroup.className = 'form-group feedback'; // Применяем стили формы

        // Создаем новое поле для ввода имени члена семьи
        const newMemberInput = document.createElement('input');
        newMemberInput.type = 'text';
        newMemberInput.className = 'family-member';
        newMemberInput.name = 'family-member';
        newMemberInput.placeholder = 'Введите имя';

        newMemberGroup.appendChild(newMemberInput); // Добавляем поле в контейнер
        familyMembersContainer.appendChild(newMemberGroup); // Добавляем блок в секцию

        // Показать секцию для добавления членов семьи, если она еще не была показана
        familyMembersSection.style.display = "block";
    });
});