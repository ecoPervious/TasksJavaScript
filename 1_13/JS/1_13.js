
document.getElementById("denominator_a").setAttribute("onclick", "onKeyUp");

function onKeyUp() {

    var denominator_a = document.getElementById("denominator_a").value;
    var denominator_b = document.getElementById("denominator_b").value;

    if (denominator_a == 0 || denominator_b == 0){

        document.getElementById("numerator_r").value = " ";
        document.getElementById("denominator_r").value = " ";
        return null;

    }

    var numerator_a = document.getElementById("numerator_a").value;
    var numerator_b = document.getElementById("numerator_b").value;

    var numerator_r = numerator_a * numerator_b;
    var denominator_r = denominator_a * denominator_b;

    var result = getAbbreviatedFraction(numerator_r, denominator_r);

    document.getElementById("numerator_r").value = result[0];
    document.getElementById("denominator_r").value = result[1];
    document.getElementById("sign_r").textContent = result[2] ? "" : " - ";


}

