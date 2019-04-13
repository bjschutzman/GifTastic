 //    Initial animal array
 var animalArray = ["wolf", "eagle", "fish", "snake", "shark", "dog", "hamster", "aligator"];

 //  displayGifInfo re-renders the HTML to display appropriate content
     
     function displayGifInfo(){

         var animal = $(this).attr("data-name");
         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=JieGv5wIDZFcnGsN9K6EDQGFnKI2528Z&limit=10";


         // creating an AJA call for the specific gif button being clicked

         $.ajax({
             url: queryURL,
             method: "GET" 
         }).then(function(response){
             
             var results = response.data;

             for (var i = 0; i < results.length; i++){
                 if(results[i].rating !== 'r' && results[i].rating !== "pg-13"){
                     var gifDiv = $('<div>');
                     gifDiv.attr("class", "gifPosition");
                     var rating = results[i].rating;
                     var p =$("<p>").text('Rating: ' + rating);
                     var animalImg = $("<img>");
                     animalImg.attr("src", results[i].images.fixed_height.url);
                 };
                 gifDiv.append(p);
                 gifDiv.append(animalImg);

                 $("#gifs-view").prepend(gifDiv);
             }
                     
         });
     }

         function renderButtons(){
             // deletes gifs prior to adding new gifs
             $("#buttons-view").empty();

             // for loop to loop through array;
             for(var i = 0; i < animalArray.length; i++){
                 // dynamically generates buttons for each of the gifs in the array. 
                 var a = $("<button>");
                 // add class of gif-btn to our button
                 a.addClass("gif-btn");
                 // adds attribute
                 a.attr("data-name", animalArray[i]);
                 // adds text
                 a.text(animalArray[i]);
                 // adding button to the buttons view div
                 $("#buttons-view").prepend(a);
             }
         }

         // function handles events where gifs are clicked
         $("#add-gif").on("click", function(event){
             event.preventDefault();

             // grabs input form textbox
             var animal = $("#gif-input").val().trim();
             // adds movie from the textbox to array
             animalArray.push(animal);

             // calling render button which handles the proccesing of our movie array;
             renderButtons();
         });

         $("#gifs-view").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });

         // adding click event to all elements with class gif-btn
         $(document).on("click", ".gif-btn", displayGifInfo);
         
         $(".gif-btn").on("click",function(){
             var state = $(this).attr("data-state");
             if(state === "still"){
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
             } else{
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("data-state", "still");
             }
         });


         // calling render button to display the inital buttonsl
         renderButtons();

