

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
        var timeDiff = 0;
        var nextTrain = "";
        var remainingTime = 0;
        var timeToArrive = "";
        $("tbody").empty();
        $.each(data, function (key, value) {

            var a = moment.unix(value.firstTrain);

            var b = moment();




            timeDiff = b.diff(a, "minutes");
            remainingTime = timeDiff % value.frequency;

            timeToArrive = value.frequency - remainingTime;

            nextTrain = moment().add(timeToArrive, "m").format("hh:mm: A");


            var trTag = $("<tr>");
            trTag.addClass("trainRow");

            var thTag = $("<th>");
            thTag.attr("scope", "row");
            thTag.html(key);
            trTag.append(thTag);

            var tdTag1 = $("<td>");
            tdTag1.html(value.destination);

            var tdTag2 = $("<td>");
            tdTag2.html(value.frequency);

            var tdTag3 = $("<td>");
            tdTag3.html(nextTrain);

            var tdTag4 = $("<td>");
            tdTag4.html(timeToArrive);

            var tdTag5 = $("<td class='deleteTrain'><img class='btn' src='./assets/images/glyphicons-remove.png'></td>");
            tdTag5.attr("train-data",key);

            trTag.append(tdTag1, tdTag2, tdTag3, tdTag4, tdTag5);



            $("tbody").append(trTag);

        })




    });

$(document).on("click",".deleteTrain",function(){

    var train = $(this).attr("train-data");
    db.ref().child(train).remove();

})

    $("#submit").on("click", function (event) {
        // event.preventDefault();



        var trainName = $("#input-train-name").val().trim();
        train.destination = $("#input-train-destination").val().trim();
        train.firstTrain = moment($("#input-train-time").val().trim(), "HH:mm A").subtract(1, "years").format("X");
        train.frequency = $("#input-train-frequency").val().trim();

        var trainObj = {
            [trainName]: train

        };

        db.ref().update(trainObj);
        //$("#newTrain").trigger("reset");




    });

    $("span").hide();
    $("tr").hover(
        function () {
            $(this).find("span").show();
        },
        function () {
            $(this).find("span").hide();
        });



});
