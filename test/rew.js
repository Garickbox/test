// Конфигурация теста
const TEST_CONFIG = {
    title: "Тестовый контрольная работа Trew",
    totalQuestions: 3,
    totalProblems: 3,
    maxScore: 12,
    telegram: {
        botToken: "8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY",
        chatId: "1189539923"
    },
    gradingScale: {
        5: 11,
        4: 9,
        3: 5,
        2: 0
    }
};

// БАНК ВОПРОСОВ (3 вопроса)
const questionsBank = [
    { 
        text: "Что такое электризация?", 
        options: [
            {t:"Сообщение телу электрического заряда", v:"correct"},
            {t:"Передача тепла от одного тела к другому", v:"wrong"},
            {t:"Движение электронов в проводнике", v:"wrong"},
            {t:"Создание магнитного поля", v:"wrong"}
        ], 
        points: 1 
    },
    { 
        text: "Какие два рода электрических зарядов существуют?", 
        options: [
            {t:"Северный и южный", v:"wrong"},
            {t:"Положительный и отрицательный", v:"correct"},
            {t:"Тепловой и холодный", v:"wrong"},
            {t:"Сильный и слабый", v:"wrong"}
        ], 
        points: 1 
    },
    { 
        text: "Как взаимодействуют тела с одноименными зарядами?", 
        options: [
            {t:"Притягиваются", v:"wrong"},
            {t:"Отталкиваются", v:"correct"},
            {t:"Не взаимодействуют", v:"wrong"},
            {t:"Сначала притягиваются, затем отталкиваются", v:"wrong"}
        ], 
        points: 1 
    }
];
    
// БАНК ЗАДАЧ (3 задачи)
const problemsBank = [
    { 
        text: "Через спираль электроплитки за 2 мин прошёл электрический заряд 600 Кл. Какова сила тока в спирали?", 
        options: [
            {t:"300 А", v:"wrong"},
            {t:"5 А", v:"correct"},
            {t:"1200 А", v:"wrong"},
            {t:"0,2 А", v:"wrong"},
            {t:"50 А", v:"wrong"},
            {t:"10 А", v:"wrong"},
            {t:"100 А", v:"wrong"},
            {t:"1 А", v:"wrong"}
        ], 
        points: 3 
    },
    { 
        text: "Напряжение на лампочке карманного фонарика 3,5 В. Чему равна работа тока за 1 минуту, если сила тока 0,28 А?", 
        options: [
            {t:"58,8 Дж", v:"correct"},
            {t:"0,98 Дж", v:"wrong"},
            {t:"12,5 Дж", v:"wrong"},
            {t:"100 Дж", v:"wrong"},
            {t:"3,5 Дж", v:"wrong"},
            {t:"28 Дж", v:"wrong"},
            {t:"10 Дж", v:"wrong"},
            {t:"1 Дж", v:"wrong"}
        ], 
        points: 3 
    },
    { 
        text: "Сила тока в проводнике 2 А при напряжении на его концах 4,5 В. Каково сопротивление проводника?", 
        options: [
            {t:"9 Ом", v:"wrong"},
            {t:"2,25 Ом", v:"correct"},
            {t:"0,44 Ом", v:"wrong"},
            {t:"4,5 Ом", v:"wrong"},
            {t:"6,5 Ом", v:"wrong"},
            {t:"1 Ом", v:"wrong"},
            {t:"3 Ом", v:"wrong"},
            {t:"7 Ом", v:"wrong"}
        ], 
        points: 3 
    }
];

// Отладочное сообщение
console.log('trew.js загружен успешно!');
console.log('Тест: ' + TEST_CONFIG.title);
console.log('Вопросов: ' + questionsBank.length);
console.log('Задач: ' + problemsBank.length);
