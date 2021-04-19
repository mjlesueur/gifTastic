
$(document).ready(function () {

    // variables: names of buttons to appear when page loads
    var buttons = ["Cowboy Bebop", "Spike Spiegel", "Jet Cowboy Bebop", "Faye Valentine", "Ed Cowboy Bebop", "See You Space Cowboy", "L Death Note", "Avatar Ang"];
    console.log(buttons);

    ///-----this is not comlete but here I want to allow the user to adjust the number of gifs being returned via bootstrap range slider-----//
    var gifRange = $("#gif-range").val();

    // !!!!!function to allow user to adjust gif range!!!!! //

    // this is relevant for snippets I commented out that create divs to hold bootstrap cards
    // var numRows = (Math.floor(gifRange / 3) + 1);



    //connect with giphy API + search query
    var API_KEY = "0QovLLtOwRNWhJsO8YAMDQR0BVtUayD0";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=";

    //load buttons with bebop/anime themes
    for (var i = 0; i < buttons.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-secondary");
        button.addClass("gif-button");
        button.text(buttons[i]);
        $("#buttons").append(button);
    }

    //allow user to create button to pull new gifs from giphy
    $("#submit-btn").on("click", function () {
        var newButton = $("<button>");
        var newButtonText = $("#new-button-input").val();

        buttons.push(newButtonText);
        newButton.text(newButtonText);

        $("#buttons").append(newButton);

        newButton.addClass("btn btn-secondary");
        newButton.addClass("gif-button");
    })

    //allow user to clear gif buttons
    $("#clear-btn").on("click", function () {
        buttons = [];
        $("#buttons").text(buttons);
    })

    // -----use giphy to populate gif div with gifs related to the button clicked on----- // 

    //user clicks button to get gifs
    $(document).on("click", ".gif-button", function () {

        ///// I wound up not using the following snippets of code but the idea was to use nexted for loops to create divs that would hold a bootstrap card that would neatly display a gif and its rating /////

        ///----make rows to to hold divs that will hold cards----///

        //for loop for rows that will hold divs
        // for (var i = 0; i < numRows; i++) {
        // var cardRow = $("<div class='row'>");
        // cardRow.attr("rowID", i);
        // console.log(cardRow.attr("rowID"));
        // $("#gifs").append(cardRow);

        //nested for loop for divs that will hold cards (that will in turn hold gif + rating)
        // for (var j = 0; j < 3; j++) {
        // console.log(i, j);
        // var cardDiv = $("<div class='col-md-4'>");
        // cardDiv.attr("divID", (i * 3 + j + 1));
        // console.log(cardDiv.attr("divID"));

        //appned cardDivs to cardRows
        // cardRow.append(cardDiv);
    

        //}

        //ajax response
        $.ajax({
        method: "GET",
        url: requestUrl + $(this).text()
    }).then(function (response) {
        console.log(response);

        // populate gif divs with images; 
        for (var i = 0; i < gifRange; i++) {

            //load gif images
            var img = $("<img>");

            //create data attributes for image, animated image, still image, state of animation
            img.attr("src", response.data[i].images.downsized.url);
            img.attr("data-animated", response.data[i].images.downsized.url);
            img.attr("data-still", response.data[i].images.downsized_still.url);
            img.attr("data-state", "animated");

            //---bring together image and rating into divs---//
            imgDiv = $("<div>");
            var ratingP = $("<p>");
            var imgRating = response.data[i].rating;
            ratingP.text("Rating:" + imgRating);
            imgDiv.append(img);
            imgDiv.append(ratingP);
            var gifsDiv = $("#gifs");
            gifsDiv.append(imgDiv);

            //change data state when clicked
            img.on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "animated") {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));
                }
                else {
                    $(this).attr("data-state", "animated");
                    $(this).attr("src", $(this).attr("data-animated"));
                }
            })

        }

    })
    })

})