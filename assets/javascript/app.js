
var topics = ["Ramen", "Cheeseburger", "Steak", "Curry", "Strudel"];

function renderButtons() {

    $("#buttonNav").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("numnums");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonNav").append(a);
    }
}

//######################################################################
//The search button that produces results that you are supposed to be able to pause (not working) Button below works but doesnt include still images.
$("#searchButton").on("click", function () {
    event.preventDefault();

    var keyWord = $("#searchBox").val().trim();
    var resultAmount = $("#ammountBox").val().trim();
    //searches for the amount of gifs you requested, rated pg, under food tag
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=s0w79PT4fT405bz6mOO8onxNkHU9uFjk&q=" + keyWord + "&limit=" + resultAmount + "&offset=0&rating=PG&tag=food&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            for (i = 0; i < response.data.length; i++) {
                //the regulat gif url that's animated
                var imageUrl = response.data[i].images.original.url;
                //the still version of the url
                var stillImage = response.data[i].images.original_still.url;

                var gifRating = response.data[i].rating;

                //creating the divs that hold each result's rating and img link
                var gifResult = $("<div>");
                gifResult.attr("class", "col-md-3");
                gifResult.html("<img src='" + stillImage + "' data-still='" + stillImage + "' data-animate='"
                    + imageUrl + "' alt='foodgif' data-state='still' class='gif' /><br/><p>Rating: " + gifRating + "</p>");

                $("#gifBox").prepend(gifResult);

            }

            //Adds search term to topics array/button section
            topics.push(keyWord);
            renderButtons();
        });
});

//Pausing function (doesn't seem to work even tho i bascically scoured the gif pausing activity for its functionality)
$(".gif").on("click", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//######################################################################
//The search button that works, but doesn't include the pausing abilitiy
$("#altButton").on("click", function () {
    event.preventDefault();

    var keyWord = $("#searchBox").val().trim();
    var resultAmount = $("#ammountBox").val().trim();
    //searches for the amount of gifs you requested, rated pg, under food tag
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=s0w79PT4fT405bz6mOO8onxNkHU9uFjk&q=" + keyWord + "&limit=" + resultAmount + "&offset=0&rating=PG&tag=food&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            for (i = 0; i < response.data.length; i++) {
                //the regulat gif url that's animated
                var imageUrl = response.data[i].images.original.url;

                var gifRating = response.data[i].rating;

                //creating the divs that hold each result's rating and img link
                var gifResult = $("<div>");
                gifResult.attr("class", "col-md-3");
                gifResult.html("<img src='" + imageUrl + "' alt='foodgif' /><br/><p>Rating: " + gifRating + "</p>");

                $("#gifBox").prepend(gifResult);

            }

            //Adds search term to topics array/button section
            topics.push(keyWord);
            renderButtons();
        });
});

//My attempt at making buttons that you click with the class of "numnums" make gifs appear. Does't seem to work
$(".numnums").on("click", function () {
    event.preventDefault();

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=s0w79PT4fT405bz6mOO8onxNkHU9uFjk&q=" + this.val() + "&limit=10&offset=0&rating=PG&tag=food&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            //goes through all results
            for (i = 0; i < response.data.length; i++) {
                var imageUrl = response.data[i].images.original.url;
                var gifRating = response.data[i].rating;

                //creating the divs that hold each result's rating and img link
                var gifResult = $("<div>");
                gifResult.addClass("col-md-4");
                gifResult.html("<img src='" + imageUrl + "' alt='foodgif' /><br/><p>Rating: " + gifRating + "</p>");

                $("#gifBox").prepend(gifResult);

            }
        });
});


