
function onKeyUp() {

    var denominator_a = document.getElementById("denominator_a").value;
    var denominator_b = document.getElementById("denominator_b").value;

    if (denominator_a == 0 || denominator_b == 0){

        document.getElementById("numerator_r").value = " ";
        document.getElementById("denominator_r").value = " ";
        return null;

    }

    var sign = document.getElementById("sign").textContent;
    sign = sign === "+" ? true : false;

    var FNA = FractionalNumber(document.getElementById("numerator_a").value, denominator_a);
    var FNB = FractionalNumber(document.getElementById("numerator_b").value, denominator_b);

    if (sign){
        FNA.addFN(FNB);
    }

    document.getElementById("numerator_r").value = FNA.numerator;
    document.getElementById("denominator_r").value = FNA.denominator;
    document.getElementById("sign_r").textContent = FNA.getSign() ? "" : " - ";


}

