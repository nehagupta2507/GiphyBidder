$(document).ready(function () {

    let radioInputs = $(":radio");
    // console.log(radioInputs);

    // playersList.on("child_added", function(snapshot) {
    //     console.log(snapshot.val().gifUrlLink);

    // });
    
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
    
    function showSelectedGifs() {
        let playersList = database.ref("gifSelected");
    
        playersList.on("value", function (snapshot) {
            let gifCount = 0;
            // console.log(child.val().gifUrlLink);
    
            snapshot.forEach(function (child) {
                console.log(child.val().gifUrlLink);
                // console.log(index);
                // $("#gif-" + (gifCount + 1)).attr("src", child.val().gifUrlLink);
                gifCount++;
                $("#gif-" + gifCount).attr("src", child.val().gifUrlLink);
            });
    
            if (gifCount === 4) {
                console.log("all players are ready");
            };
        });
    };
    showSelectedGifs();
});
    

    