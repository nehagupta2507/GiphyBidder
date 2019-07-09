$(document).ready(function() {
//Global Variables
let playerNames = [];
// Step 1: Modal dialog pop up
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('Welcome ' + recipient);
    modal.find('.modal-body input').val(recipient);
  })

// Step 2   : Initialize Firebase
// This is the code we copied and pasted from app page
const firebaseConfig = {
    apiKey: "AIzaSyDLiD3JSjpjHexN1pghGWNvyMlEaq5HIcY",
    authDomain: "project1-db25d.firebaseapp.com",
    databaseURL: "https://project1-db25d.firebaseio.com",
    projectId: "project1-db25d",
    storageBucket: "",
    messagingSenderId: "818437551042",
    appId: "1:818437551042:web:fe350cab90ffaf83"
  };
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// Step 3: Capture confirm Click for adding the player name to the database

$("#playerName").on("click", function(event){
// Don't refresh the page! Prevent form from submitting itself.
event.preventDefault();
playerNames= $("#message-text").val();
console.log(playerNames);
//Adding initial data to your Firebase database.
database.ref().push({
    playerName: playerNames
})
});
})