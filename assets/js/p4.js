function showP4() {
    $('#page1').hide()
    $('#page2').hide()
    $('#page3').hide()
    $('#gameFull').hide()
    $('#page4').show()
    let playScoreList = []
    let playNameList = []
    
    let player1NameResult, player2NameResult, player3NameResult, player4NameResult = ""

    database.ref("buttons/").on('value', function (snapshot) {
        console.log(snapshot);
        let count = 0;
        snapshot.forEach(function (childnode) {
            if (childnode.key === "player1") {
                player1NameResult = childnode.val().playerName
                playNameList.push(player1NameResult)
                playScoreList.push(player1Score)
            }
            if (childnode.key === "player2") {
                player2NameResult = childnode.val().playerName
                playNameList.push(player2NameResult)
                playScoreList.push(player2Score)
            }

            if (childnode.key === "player3") {
                player3NameResult = childnode.val().playerName
                playNameList.push(player3NameResult)
                playScoreList.push(player3Score)
            }

            if (childnode.key === "player4") {
                player4NameResult = childnode.val().playerName
                playNameList.push(player4NameResult)
                playScoreList.push(player4Score)
            }


        })
    })

    let win = $('<h1>')
    let max = Math.max(...playScoreList)
    let maxPlayer = playScoreList.indexOf(max)
    win.html("    Winner is : " + playNameList[maxPlayer])

    $('#page4').show()
    $('#page4').prepend(win)
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize = '20';
    
    new Chart(document.getElementById("resultsBar"), {
        type: 'bar',
        data: {
            labels: [player1NameResult, player2NameResult, player3NameResult, player4NameResult],
            datasets: [
                {
                    label: "Points",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#ff0000", "#e8c3b9"],
                    data: [player1Score, player2Score, player3Score, player4Score]
                }
            ]
        },
        options: {
            beginAtZero: true,
            legend: { display: false },
            title: {
                display: true,
                text: 'GIF Results'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
    });

    find

}

function globalReset() {
    resetGame();
    location.reload();
}