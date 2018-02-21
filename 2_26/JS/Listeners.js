/**
 * function onClick
 *
 * Слушатель на клик для поля ввода с id="in"
 */
function onClick() {
    upDateOutput();
}

/**
 * function onKetUp
 *
 * Слушатель на отпуск клавиши для поля ввода с id="in"
 */
function onKeyUp() {

    // var str = document.getElementById("in").value;
    //
    // if (str.charAt(str.length - 1) === "(") {
    //     document.getElementById("in").value += ")";
    //     moveCaretToStart(str.length);
    // }

    upDateOutput();
}

/*
Функция для установки курсора в нужную позицию, в данный момент заморожена. Предполагалось использовать её для
установка курсора внутрь скобок, после ввода открывающейся скобки.
 */
// function moveCaretToStart(p) {
//     if (document.getElementById("in").selectionStart) {
//         document.getElementById("in").setSelectionRange(p, p);
//         document.getElementById("in").focus();
//     }
// }
