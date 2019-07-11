$(document).ready(function () {

    let radioInputs = $(":radio");
    // console.log(radioInputs);

    // playersList.on("child_added", function(snapshot) {
    //     console.log(snapshot.val().gifUrlLink);

    // });

    let radioInputs = $(":radio");
    // console.log(radioInputs);
    
    $(".form-check-input").on("click", function () {
        let value = $(this).attr("value");
        let dataGroup = $(this).attr("data-group");

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].value === value) {
                $(radioInputs[i]).attr("disabled", true);
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

    $("#submit-button").on("click", function() {
        let checkedCount = 0;

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                checkedCount++;
            };
        };

        if (checkedCount < 3) {
            alert("Please select points for all the gifs.");
        } else {
            // input code to calculate score
            alert("Calculating score...");
        };


});


function getGifAnswers(){
    let playersList = database.ref("gifSelected");

    playersList.on("value", function (snapshot) {
        let gifCount = 0;

    });
}
