# To-Do list

[Деплой](https://webdevitmo.plida.ru/lab3/index.html)

В рамках данной работы я разработала веб приложение игры 2024.

В работе был использован чистый javascript + html и css с предпроцессором scss. Сайт был поднят на личном физическом сервере Yetti с применением nginx и lxc.

## Требования к работе

### Логика игры

1. Сетка 4x4 генерируется динамически с помощью JavaScript

![](media-report/logic-1-1.png)
![](media-report/logic-1-2.png)

2. После каждого хода корректно появляется 1-2 новых плитки с значением 2 или 4.

В классической игре появляется только по 1 плитке, что было решено сэмулировать.

<img src="media-report/logic-2.gif" width="40%" height="40%">

3. Слияние плиток однаковых чисел работает во всех направлениях

<img src="media-report/logic-3.gif" width="40%" height="40%">

4. В начале игры на поле есть 1-3 случайных тайла с значением 2 либо 4

<img src="media-report/logic-4.gif" width="40%" height="40%">

5. Корректный расчет и отображение очков

<img src="media-report/logic-5-1.gif" width="40%" height="40%">

<img src="media-report/logic-5-2.gif" width="40%" height="40%">

### Взаимодействие вне игрового поля

1. Реализована проверка на окончание игры (Нет возможных ходов)

Ситуация, когда игрок ещё мог двигаться, но он выбрал неверное направление:

<img src="media-report/interaction-1-1.gif" width="40%" height="40%">

Ситуация, где возможных ходов нет:

<img src="media-report/interaction-1-2.gif" width="40%" height="40%">

2. Кнопка "Начать заново" сбрасывает состояние поля и счет (Без перезагрузки страницы)

<img src="media-report/interaction-2.gif" width="40%" height="40%">

3. Реализована кнопка "Отмена хода" (undo)

<img src="media-report/interaction-3.gif" width="40%" height="40%">

4. В таблице отражается топ-10 рекордов, которые сохранил пользователь. (Хранение в localStorage)

<img src="media-report/interaction-4.gif" width="40%" height="40%">

### Взаимодействие с игрой

1. Поддержка управления кнопками клавиатуры для десктопа и свайпами/виртуальными кнопками на мобильных устройствах

<img src="media-report/interact-with-1-1.gif" width="40%" height="40%">

<img src="media-report/interact-with-1-2.gif" width="40%" height="40%">

2. Состояние игры сохраняется в localStorage

<img src="media-report/interact-with-2.gif" width="40%" height="40%">

### Визуальное отображение

1. Каждое значение плитки имеет свой цвет

![](media-report/visual-1.png)

2. Плавная анимация движения и слияния плиток

<img src="media-report/visual-2.gif" width="40%" height="40%">