function upDate() {

    setBackgroundColorAllCell("white");
    var max = getMaxValue();
    var res = setBackgroundColorCellValue(max, "green");
    setInputIdCell(res);
}

function onClickCell() {
    upDate();
}

function onKeyUpCell() {
    upDate();
}

function onClickButtonRandom() {
    generationRandomValuesTable();
    upDate();
}

function setBackgroundColorCellValue(value, color){

    var string = "";
    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            var id = getId(tr, td);
            if (getValueCell(id)===value){
                setBackgroundColorCell(id, color);
                string += "(" + td + ";" + tr + ") = " + value + "<br>";
            }
        }
    }
    return string;
}

function getMaxValue(){

    var maxValue = getValueCell(getId(0, 0));

    for (var tr = 0; tr < 10; tr++){
        for (var td = 0;td < 10; td++){
            var v = getValueCell(getId(tr, td));
            if (v > maxValue){
                maxValue = v;
            }
        }
    }
    return maxValue;
}

function setBackgroundColorAllCell(color) {

    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            setBackgroundColorCell(getId(tr, td),color);
        }
    }

}

function setBackgroundColorCell(id, color) {
    document.getElementById(id).style.backgroundColor = color;
}

function generationTable() {

    var result = "";

    for (var i = 0; i < 10; i++) {

        result += "<tr>" + generationTableString(i) + "</tr>";

    }

    document.getElementById("main_table").innerHTML = result;
}

function generationTableString(tr) {

    var result = "";

    for (var i = 0; i < 10; i++) {

        result += "<td>" +
            "<input " +
            "class='cell' " +
            "id='" + getId(tr, i) + "' " +
            "type='number' " +
            "onclick='onClickCell()' " +
            "onkeyup='onKeyUpCell()'/></td>";

    }

    return result;

}

function generationRandomValuesTable() {

    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            setValueCell(getId(tr,td), randomInteger(getMinRandom(),getMaxRandom()));
        }
    }

}

function getMinRandom() {
    var v = parseInt(document.getElementById("min_random").value);
    if(isNaN(v)){
        v = 0;
    }
    return v;
}

function getMaxRandom() {
    var v = parseInt(document.getElementById("max_random").value);
    if(isNaN(v)){
        v = 0;
    }
    return v;
}

function getId(tr, td) {

    return "TR_" + tr + "TD" + td;
}

function getValueCell(id) {

    var i = parseInt(document.getElementById(id).value);
    if(isNaN(i)){
        i = 0;
    }
    return i;
}

function setValueCell(id, value) {
    document.getElementById(id).value = value;
}

function setInputIdCell(str) {
    document.getElementById("input_id_cell").innerHTML = str;
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}