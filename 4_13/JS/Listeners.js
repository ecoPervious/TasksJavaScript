function onClickGenerationRandom() {
    generationRandomValuesTable();
    upDateTableValueColorMax();
}

function onClickSetZeroAllCells() {
    setValueAllCells(0);
    setBackgroundColorAllCell("white");
    setInputSum(0);
}

function onClickCheckBox() {
    setIsAddRepeatMaxValue(getIsAddRepeatMaxValue());
    upDateTableValueColorMax();
}

function onClickGenerationTable() {
    generationTable(getValueInputM(),getValueInputN());
    setValueAllCells(0);
}

function onKeyUpCell(){
    upDateTableValueColorMax();
}

