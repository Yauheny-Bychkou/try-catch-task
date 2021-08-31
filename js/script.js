// описываем функцию filterByType, в которую передаём аргументы:
// 1-ый аргумент type - это тип данных значения, которое мы вводим (Number, String или Boolean)
// 2-ой аргумент- это rest параметр ...value, который собирает все полученные данные в массив
// пропускаем массив, который получили rest параметром (...values), через Метод filter(), создаём новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
const filterByType = (type, ...values) => values.filter((value) => typeof value === type),
  //описываем функцию, которая скрывает элементы
  hideAllResponseBlocks = () => {
    //находим все элементы на странице с классом .dialog__response-block
    const responseBlocksArray = Array.from(document.querySelectorAll("div.dialog__response-block"));
    //задаём цикл форыч, в котором перебираем все элементы с классом .dialog__response-block и делаем каждый невидимым
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  //описываем функцию showResponseBlock, в которую передаём аргументы:
  // 1-ый blockSelector - это элемент, который мы передаём при вызове функции в зависимости от ситуации(ошибка, результат или пустотое поле)
  // 2-ой аргумент msgText - это текст содержимого (ошибки или результата)
  // 3 -ий аргумент spanSelector - это элемент span, который мы передаём при вызове в зависимости от ситуации(ошибка, результат или пустотое поле)
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // вызываем функцию hideAllResponseBlocks
    hideAllResponseBlocks();
    // находим элемент, который мы передаём в аргумент blockSelector при вызове функции showResponseBlock и делаем его видимым
    document.querySelector(blockSelector).style.display = "block";
    // задаём условие: если есть элемент, который мы передаём в аргумент spanSelector, то выполняется следующий код:
    if (spanSelector) {
      //элементу, который мы передаём в аргумент spanSelector, методом .textContent, задаём текстовое содержимое msgText
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // описываем функцию, которая показывает ошибку в случае, если: некорректно передаём значение в инпут с id data, если есть ошибка блоке кода try.
  // В функции showError вызываем функцию showResponseBlock, в которую передаём аргументы:
  // 1-ый аргумент- элемент с классом .dialog__response-block_error, где будет отображаться ошибка
  // 2-ой аргумент msgText - это текст ошибки
  // 3 -ий аргумент #error - это span, в который будет выводится текст ошибки
  showError = (msgText) => showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  // описываем функцию, которая показывает результат в случае, если значение инпута (id #data) совпадает с выбранным типом данных(Number, String, Boolean)
  // В функции showError вызываем функцию showResponseBlock, в которую передаём аргументы:
  // 1-ый аргумент элемент с классом .dialog__response-block_ok, где будет отображаться положительный результат
  // 2-ой аргумент msgText - это текст результата
  // 3 -ий аргумент #ok - это span, в который будет выводится положительный результат
  showResults = (msgText) => showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // описываем функцию, которая показывает подсказку, что поле не должно быть пустым
  // В функции showError вызываем функцию showResponseBlock, в которую передаём аргумент:
  // .dialog__response-block_no-results - это элемент, который содержит параграф со следующим тектсом: "Пока что нечего показать.""
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  //описываем функцию tryFilterByType, аргументы type, values передаём при вызове функции
  tryFilterByType = (type, values) => {
    // Конструкция try...catch пытается выполнить инструкции в блоке try, и, в случае ошибки, выполняет блок catch.
    try {
      //  Метод join() объединяет все элементы массива, полученного функцией filterByType, в строку.
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // Тернарный оператор. если valuesArray.length === true, то выполняем следующий код:
      const alertMsg = valuesArray.length
        ? //присваиваем значения переменной alertMsg на основе результатов работы тернарного оператора :
          // если valuesArray.length === true, то переменной alertMsg присваиваем значение:
          `Данные с типом ${type}: ${valuesArray}`
        : // если valuesArray.length !== true, то переменной alertMsg присваиваем значение:
          `Отсутствуют данные типа ${type}`;
      // вызываем функцию showResults, передаём переменную alertMsg
      showResults(alertMsg);
      //в случае ошибки в try{}, выполняет блок catch.
      // e - это объект ошибки. По умолчанию вызывается метод e.stack
    } catch (e) {
      // вызываем функцию showError. В качестве аргумента передаём строку с ошибкой
      showError(`Ошибка: ${e}`);
    }
  };

//находим элемент с id filter-btn
const filterButton = document.querySelector("#filter-btn");

// вешаем обработчик события "клик" на элемент с id filter-btn
filterButton.addEventListener("click", (e) => {
  //находим на странице элемент с id type
  const typeInput = document.querySelector("#type");
  //находим на странице элемент с id data
  const dataInput = document.querySelector("#data");

  // задаём условие: если элемент с id data пустой
  if (dataInput.value === "") {
    //если условие выполняется, то выполняем следующий код:
    // устанавливаем специальное сообщение для  выбранного элемента (dataInput)
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    // вызываем функцию showNoResults
    showNoResults();
    // если условие не выполняется, то выполняем слудующий код:
  } else {
    // Если элемент dataInput не имеет пользовательской ошибки в параметре указываем пустую строку
    dataInput.setCustomValidity("");
    //Метод preventDefault () сообщает, что его действие по умолчанию не должно выполняться так, как обычно
    e.preventDefault();
    // Вызываем функцию tryFilterByType и передаём 2 аргумента:
    // 1-ый аргумент: typeInput.value.trim() - значение элемента typeInput
    // 2-ой аргумент: dataInput.value.trim() - значение элемента dataInput
    // метод .trim()- удаляет пробельные символы с начала и конца строки
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
