const firebaseConfig = {
  apiKey: "AIzaSyDLiD3JSjpjHexN1pghGWNvyMlEaq5HIcY",
  authDomain: "project1-db25d.firebaseapp.com",
  databaseURL: "https://project1-db25d.firebaseio.com",
  projectId: "project1-db25d",
  storageBucket: "project1-db25d.appspot.com",
  messagingSenderId: "818437551042",
  appId: "1:818437551042:web:fe350cab90ffaf83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let playerId;
let playerName;
let idVal;

$(document).ready(function() {
$("#page1").show(); 
$("#questionPage").hide();
$("#page3").hide();
//Global Variables
  let players;
// Step 1: Modal dialog pop up
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    playerId = button.attr("id");
    modal.find('.modal-title').text('Welcome ' + recipient);
    modal.find('.modal-body input').val(recipient);

  })

// Step 2   : Initialize Firebase
// This is the code we copied and pasted from app page


//Step 3: Setting up firebase chat
// var user = firebase.auth().signInAnonymously();
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // User is signed in.
//         var isAnonymous = user.isAnonymous;
//         user_id = user.uid;
//       } else {
//         // User is signed out.
//       }
//     });

//     function writeUserData(message) {
//       db_ref.push({
//           user_id: user_id,
//           message: message
//       });
//   }

//   $(".messages").animate({ scrollTop: $(document).height() }, "fast");
//   var user_id;
//   function newMessage() {
    
//     message = $(".message-input input").val();
//     if($.trim(message) == '') {
//       return false;
//     }
//     writeUserData(message);
//   };
//   $('.submit').click(function() {
//     newMessage();
//   });
//   $(window).on('keydown', function(e) {
//     if (e.which == 13) {
//       newMessage();
//       return false;
//     }
//   });

//   // get firebase database reference...
// var db_ref = firebase.database().ref('/');
// db_ref.on('child_added', function (data) {
//   var type;
//   if(data.val().user_id == user_id){
//     type="sent";
//   }
//   else{
//     type="replies";
//   }
//   $('<li class="'+type+'"><p>' + data.val().message + '</p></li>').appendTo($('.messages ul'));
//   $('.message-input input').val(null);
//   $('.contact.active .preview').html('<span>You: </span>' + data.val().message);
//     $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, 0);
// });

//Step 4: Capture confirm Click for adding the player name to the database

$("#playerName").on("click", function(event){
// Don't refresh the page! Prevent form from submitting itself.
event.preventDefault();
$("#exampleModal").modal("hide");
idVal = "#" + playerId;
//$(idVal).prop("disabled", true);
players = $("#message-text");
console.log(idVal);
playerName = players.val();
console.log(playerName);
database
//Adding initial data to your Firebase database.
database.ref("buttons/" + playerId).set(true);
players.val ('');
});

database.ref("buttons/").on('value', function(snapshot){
  console.log(snapshot);
  let count=0;
  snapshot.forEach(function(childnode){
    console.log(childnode.key);
    console.log(childnode.val());
    idVal = "#" + childnode.key;
    $(idVal).prop("disabled", childnode.val());
      if (childnode.val()== true) { 
        count++; 
      }
  })
  if(count===4){
    console.log("game is full.let's begin");
    getQuestion();
    setQuestion();
    showP2()
  }
})
database.ref("gifSelected").once('value', function(snapshot){
  snapshot.forEach(function(childnode){
    database.ref("buttons/" + childnode.key).set(false); 
  })
})

})

//once game is complete p3.js should call this to restart the game 
function resetGame(){
  database.ref("buttons/").once('value', function(snapshot){
    snapshot.forEach(function(childnode){
      database.ref("buttons/" + childnode.key).set(false); 
    })
  })
  database.ref("gifSelected/").set(""); 
  $("#page1").show();
  $("#questionPage").hide();
  $("#page3").hide();
}
