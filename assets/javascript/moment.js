

var train ={
    destination : "",
    firstTrain :"",
    frequency :""

}
$(document).ready(function () {

 // Create a variable to reference the database.
    var db = firebase.database();
    var trainObj = undefined;

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#input-train-name").val().trim();
        
        train.destination = $("#input-train-destination").val().trim();
        train.firstTrain = $("#input-train-time").val().trim();
        train.frequency = $("#input-train-frequency").val().trim();

        trainObj = {
            [trainName]:train

        };

        db.ref().set(trainObj);
        



    })

});