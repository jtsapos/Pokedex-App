let pokemonRepository = (function() { //creates an IIFE for pokemon list
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=75';
  //let modalContainer = document.querySelector('#exampleModal'); //acts as a global variable where all the functions below have access to it.
  function add(pokemon) { // function to add a pokemon to the pokemonList
    if (typeof pokemon === "object" && "name" in pokemon) { //&& //if pokemon is an object and has a name we will push the pokemon in the repository
      //"detailsUrl" in pokemon
      pokemonList.push(pokemon);
    } else {
      document.write("Pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let $row = $(".row"); //here we declare a $row variable and assign it to the row div class from index.html

      let $card = $('<div class="card" style="width:400px"></div>'); //declare card variable with which to present each pokemon image
      let $image = $( //here we declare an image variable to append to a card for each separate pokemon
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      $image.attr("src", pokemon.imageUrlFront); //here we assign the frontal image attribute of the pokemon from the pokemon repository
      let $cardBody = $('<div class="card-body"></div>'); //div class 'card-body' assigned to the cardBody variable
      let $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>"); //h4 class 'card-title' assigned to $cardTitle variable along with name of pokemon
      let $seeProfile = $( //$seeProfile variable is assigned to the See Profile button
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $row.append($card); //each pokemon card will be displayed as a series of rows
      //Append the image to each card
      $card.append($image); //Pokemon image is appended to each card
      $card.append($cardBody); //div class 'card-body' is appended to the $card variable
      $cardBody.append($cardTitle); //card title is now appended to the $cardbody
      $cardBody.append($seeProfile); //seeProfile button is now appended to $cardBody variable

      $seeProfile.on("click", function(event) { //Here, .on is equivalent to addEventListener in JavaScript and takes two arguments.
        //The first one is the event (in this case it’s the click event) and the second argument takes a function (event) which calls the showDetails function)
        // when See Profile button is clicked.
        showDetails(pokemon);
      });
    });
  }
  // function that prints pokemon details onto console
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() { //loads the pokemon details and prints to the console
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function loadList() { //promise function which fetches the apiUrl
    return $.ajax(apiUrl) //Here we use Ajax to send and fetch data asynchronously from an external API
      .then(function(json) { //json is basically the entire result of the apiUrl
        json.results.forEach(function(item) { //.results is the key
          let pokemon = {
            name: item.name, //from the api pokemon list here we are retrieving the pokemon name
            detailsUrl: item.url //from the api pokemon list here we are retrieving the pokemon details (url)
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl; //detailsUrl comes from loadList function above which collects the details for each pokemon
    return $.ajax(url) { //Here we use Ajax to send and fetch data asynchronously collects all the details through the response and passes
      //return response.json(); //them through to the json
    }).then(function(details) { //once we get the json we chain another promise .then function which collects all the details
      // Now we add the details to the item
      pokemon.imageUrlFront = details.sprites.front_default; //item is coming from the apiUrl and we're collecting details from the sprites characteristics
      pokemon.imageUrlBack = details.sprites.back_default;
      pokemon.height = details.height; //collecting height data
      //loop for each ofthe pokemon types.
      //Also changing the background color depending on each pokemon type.
      pokemon.types = [];
      for (let i = 0; i < details.types.length; i++) {
        pokemon.types.push(details.types[i].type.name);
      }
      //loop to get the abilities of a selected pokemon
      pokemon.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        pokemon.abilities.push(details.abilities[i].ability.name);
      }

      pokemon.weight = details.weight;
    })
    .catch(function(e) {
      console.error(e);
    });
}

//function buttonEventListener(button, pokemon) { // When the user clicks the selected button, the click function passed as the second parameter in addEventListener will be called to show pokemon details.
//button.addEventListener("click", function(event) { //event listener which listens for a mouseclick, then executes the show details function for the pokemon
//  showDetails(pokemon);
//  });
//} //buttonEventListener(button, pokemon);} // Adds an event listener to the created button above

//show modal content
function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");
  // let $modalContainer = $("#modal-container");
  //clear existing content of the modal
  // modalHeader.empty();
  modalTitle.empty();
  modalBody.empty();
  //creating element for name in modal content
  let nameElement = $("<h1>" + pokemon.name + "</h1>");
  // // creating img in modal content
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr("src", pokemon.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr("src", pokemon.imageUrlBack);
  // //creating element for height in modal content
  let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
  // //creating element for weight in modal content
  let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
  // //creating element for type in modal content
  let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
  // //creating element for abilities in modal content
  let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");

  ////Now we need to append these elements to the modal
  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
};

})();

pokemonRepository.loadList().then(function() { //passes the two functions below through it to give us the list of pokemons
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});