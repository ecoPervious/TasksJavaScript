function Main(){

    var list_text = [" ваши прекрасные глаза", " прекрасная маркиза", " от любви", " сулят", " мне", " смерть"];

    var result = "";

    var i = 1;

    for(var e1  = 0; e1 <= 5; e1++){
        for(var e2  = 0; e2 <= 5; e2++){
            if (e2 === e1){
                continue;
            }
            for(var e3  = 0; e3 <= 5; e3++){
                if (e3 === e1 || e3 === e2){
                    continue;
                }
                for(var e4  = 0; e4 <= 5; e4++){
                    if (e4 === e1 || e4 === e2 || e4 === e3){
                        continue;
                    }
                    for(var e5  = 0; e5 <= 5; e5++){
                        if (e5 === e1 || e5 === e2 || e5 === e3 || e5 === e4){
                            continue;
                        }
                        for(var e6  = 0; e6 <= 5; e6++){
                            if (e6 === e1 || e6 === e2 || e6 === e3 || e6 === e4 || e6 === e5){
                                continue;
                            }

                            var premier_text = list_text[e1];
                            premier_text = premier_text.charAt(1).toUpperCase() + premier_text.substr(2);
                            result += i + ". " + premier_text + list_text[e2] + list_text[e3]
                                + list_text[e4] + list_text[e5] + list_text[e6] + ".<br/>";
                            i++;
                        }
                    }
                }
            }
        }
    }

    document.getElementById("result").innerHTML = result;

}