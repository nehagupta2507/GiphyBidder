$(document).ready(function () {

    let radioInputs = $(":radio");
    // console.log(radioInputs);

    $(".form-check-input").on("click", function () {
        let value = $(this).attr("value");
        let dataGroup = $(this).attr("data-group");

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].value === value) {
                $(radioInputs[i]).attr("disabled", "true");
            };
        };

        $("." + dataGroup).attr("disabled", true);
    });

    $("#reset-button").on("click", function () {
        for (let i = 0; i < radioInputs.length; i++) {
            $(radioInputs[i]).attr("disabled", false);
            radioInputs[i].checked = false;
        };
    });



});


function getGifAnswers(){
    let playersList = database.ref("gifSelected");

    playersList.on("value", function (snapshot) {
        let gifCount = 0;

        snapshot.forEach(function (child, index) {
            child.val();
            console.log(child.val());
            console.log(index);
            $("#gif-" + (gifCount + 1)).attr("src", child.val());
            gifCount++;
        });

        if (gifCount === 4) {
            console.log("all players ready");
        };
    });
}
