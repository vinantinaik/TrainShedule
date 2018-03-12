

var train = {
    destination: "",
    firstTrain: "",
    frequency: ""

}
$(document).ready(function () {

    // Create a variable to reference the database.
    var db = firebase.database();


    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html

    db.ref().on('value', function (snapshot) {

        var data = snapshot.val();
        $("tbody").empty();
        $.each(data,function(key,value){

            var trTag = $("<tr>");
            var thTag = $("<th>");
            thTag.attr("scope", "row");
            thTag.html(key);
            trTag.append(thTag);
            var tdTag1 = $("<td>");
            tdTag1.html(value.destination);
    
            var tdTag2 = $("<td>");
            tdTag2.html(value.frequency);
    
            var tdTag3 = $("<td>");
            tdTag3.html(value.firstTrain);
    
            var tdTag4 = $("<td>");
            tdTag4.html("5");
    
            trTag.append(tdTag1, tdTag2, tdTag3, tdTag4);
    
            $("tbody").append(trTag);

        })

       

        getNextTrainTime(data.firstTrain);

    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        
        

        var trainName = $("#input-train-name").val().trim();
        train.destination = $("#input-train-destination").val().trim();
        train.firstTrain = $("#input-train-time").val().trim();
        train.frequency = $("#input-train-frequency").val().trim();

        var trainObj ={
            [trainName]: train

        };

        db.ref().update(trainObj);




    });
    // getTrainSchedules();

    // function getTrainSchedules() {
    //     var data = snapshot.val();
    // }

    function getNextTrainTime(firstTrainTime) {

       

        var time = new Date();

        var timeStart = new Date(time.getDate().toString() + " " +firstTrainTime) ;

        var diff = (time - timeStart)/60000;

        var minutes = diff % 60;

        var hours = (diff- minutes)/60;
        console.log(
            time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        );
        

    }

});