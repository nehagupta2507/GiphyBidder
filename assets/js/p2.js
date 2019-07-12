let numberOfImgResults = 7
let searchTerms = []
let selectedImage = []

$(function () {
    // look for gif
    $(document).on("click", "#searchGif", loadData);
    // switch between classes 
    $(document).on("mouseenter", ".gifOption", toggleClass);
    $(document).on("mouseleave", ".gifOption", toggleClass);
    // select gif
    $(document).on("click", ".gifOption", imgSelected);
    // make sure only p2 displays
    $(document).on("focus", "#searchTerm", hideDiv);
    // allow keyboard 
    $(document).on("keyup", "button", buttonSelected);

    $('#questionPage').hide();
});

// able to use keyboard
function buttonSelected(e){
    let item = e.currentTarget
    if (e.keyCode === 13) {
        $(item).children().click()
    }
}

// hide other blocks
function hideDiv() {
    $('#page1').hide()
    $('#page3').hide()
}

// loads data from API
function loadData(searchTerm) {
    // https://developers.giphy.com
    // API key for giphy
    let gifCode = 'oDBbCNYAnom4r5VRX5qdsVfsNn6WeaxX';
    if (typeof searchTerm == "object") {
        searchTerm = $("#searchTerm").val()
    }

    console.log(searchTerm)
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + gifCode + '&q=' + searchTerm + '&limit=' + numberOfImgResults + '&offset=0&rating=G&lang=en';

    $.ajax({
        url: url,
        method: "GET",
    }).fail(function () {
        searchTerm = searchTerm + 'y'
        loadData(searchTerm)
        console.log(searchTerm)

        $('#results').empty().html(`
        <div class='col'>
        <div class="text-center">
        <h1>GIPHY doesn\'t like "` + searchTerm + `" as a search term, please try again</h1>
        </div>
      </div>`);
    }).then(function (response) {
        let gifs = response.data;
        if (gifs.length > 0) {
            // https://stackoverflow.com/questions/10543392/fadeout-empty-a-div-and-then-put-new-content-in
            $('#results').fadeOut(300, function () {
                $(this).empty();
                addResults(gifs);
            }).fadeIn(300);
        } else {
            $('#results').empty().html(`
        <div class='col'>
        <div class="text-center">
        <h1>GIPHY couldn't find "` + searchTerm + `", please try again</h1>
        </div>
      </div>`);
        }
    }).done(function () {
        $('#searchTerm').val('')
        $('body').tooltip('dispose').tooltip({
            selector: '.gifOption'
        });
    });
}

// add each image to the page
function addResults(imageList) {
    for (let i = 0; i < imageList.length; i++) {
        if (i <= numberOfImgResults) {
            let gif = imageList[i]
            // console.log(gif)
            let img = $('<img src="' + gif.images.fixed_height.url + '" class="mw-100 shadow rounded-pill gifOption" data-id="' + gif.id + '" alt="' + gif.title + '"  title="' + gif.title + '" data-toggle="tooltip" data-placement="top">')
            let divCol = $('<button class="p-0 m-2 border-0 bg-transparent">')
            divCol.append(img)
            $('#results').append(divCol)
        }
    }
}

// toggle shadow class
function toggleClass(e) {
    let item = e.currentTarget
    $(item).toggleClass('rounded')
    $(item).toggleClass('rounded-pill')
}

function imgSelected(e) {
    $('#searchGroup').hide()

    $('body').tooltip('dispose').tooltip({
        selector: '.gifSelected'
    })
    let item = e.currentTarget
    let gifSelected = $(item).attr('src');
    console.log($(item).attr('src'))
    $(item).addClass('gifSelected').removeClass('gifOption')
    $('.gifOption').hide()

    sendResponseToDB(gifSelected)
}

function showP2(){
    // we should send the question to display here
    setupPage2()
}

function setupPage2(){
    hideDiv()
    $('#questionPage').show()
    // getQuestion()
    $('#searchTerm').focus()
}


function setQuestion(){
    let question = database.ref('questionSelected/').orderByKey().limitToLast(1);
    question.once("value").then(function (snap) {
        // If they are connected..
        let result = snap.val()
        $.each(result, function(i){
            $('#questionQuote').html(result[i])
        })
    })
}


function getQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1&category=14&difficulty=easy'
    let quesion = ''
    $.ajax({
        url: url,
        method: "GET",
    }).fail(function () {
        
    }).then(function (response) {
        question = response.results[0].question
        database.ref('questionSelected').push(question)

    }).done(function () {
            
    });

}

// let newLog = {}


function sendResponseToDB(gifUrl) {
    let newLog = {}
    console.log('playerId: ' + playerId)
    newLog[playerId] = 
    {
        gifUrlLink:gifUrl,
        pName: playerName,
        pId: playerId
    }
    let t = database.ref('gifSelected').update(newLog)
    // console.log('saved: ' + t.key)
    // database.ref('gifSelected/ ' + playerId).set(newLog)

    let gifList = database.ref('gifSelected')
    gifList.on("value", function (resultData) {
        let countImages = 0
        resultData.forEach(function (child) {
            countImages++
        })
        if (countImages > 3){
            $('#page1').hide()
            $('#questionPage').hide()
            $('#page3').show()
            console.log('all players ready')
        }
    });

}
