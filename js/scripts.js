let pokemonRepository = (function() { //creates an IIFE for pokemon list
      let pokemonList = [];
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=76';
      let modalContainer = document.querySelector('#exampleModal'); //acts as a global variable where all the functions below have access to it.
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
        loadDetails(pokemon).then(function() {
        let pokemonList = document.querySelector(".pokemon-list"); //create new varible pokemonList wch takes queryselector wch is .pokemon-list class(frm index.html)
        let listpokemon = document.createElement("li"); //after creating ul element we create an li element using createElement
        let button = document.createElement("button"); //inside each li we create a button tag with createElement
        let pokemonImage = document.createElement("img"); //here we create an image tag
        let pokemonName = document.createElement("div"); //here we create a name tag
        pokemonImage.src = pokemon.imageUrlFront;
        pokemonImage.alt= "image " + pokemon.name;
        pokemonName.innerText = pokemon.name; 
        button.innerText = "See details"; //renders the button, adds pokemon name inside the button
        listpokemon.classList.add("list-group-item");
        button.classList.add("btn", "btn-primary");//add bootstrap css class to style your list of elements with some borders and padding
        listpokemon.appendChild(pokemonName); //calls the listpokemon and appends the Pokemon name
        listpokemon.appendChild(pokemonImage); //calls the listpokemon and appends the Pokemon image
        listpokemon.appendChild(button); //calls the listpokemon and appends the child button to the li (ea button is an li)
        pokemonList.appendChild(listpokemon); //now we append the li to the ul (.pokemon-List)(which is the main element or parent element)
        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-toggle", "modal");
        //function buttonEventListener(button, pokemon) { // When the user clicks the selected button, the click function passed as the second parameter in addEventListener will be called to show pokemon details.
        button.addEventListener("click", function(event) { //event listener which listens for a mouseclick, then executes the show details function for the pokemon
            showDetails(pokemon);
            // function that prints pokemon details onto console
            });
          });
        }
              
          function loadList() { //promise function which fetches the apiUrl
            return fetch(apiUrl).then(function(response) { //promise fetch(url) collects all the details through the response and passes
                return response.json(); //them through to the json
              }).then(function(json) { //json is basically the entire result of the apiUrl
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
            return fetch(url).then(function(response) { //promise fetch(url) collects all the details through the response and passes
                return response.json(); //them through to the json
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
          // function that prints pokemon details onto console
            function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function() { //loads the pokemon details and prints to the console
           console.log(pokemon);
            showModal(pokemon);
                });
               }    

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
            // // creating element for image in modal content
            let imageElementFront = $('<img class="modal-img" style="width:50%">');
            imageElementFront.attr("alt", "image " + pokemon.name);
            imageElementFront.attr("src", pokemon.imageUrlFront);
            let imageElementBack = $('<img class="modal-img" style="width:50%">');
            imageElementBack.attr("alt", "image " + pokemon.name);
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

                 //when the promise returned by fetch() is resolved,the response from the external source will be passed to the callback function in the .then()block
          fetch('https://pokeapi.co/api/v2/pokemon/').then(function(response) {
            return response.json(); //from there the promise is passed through the json()key, which holds a function that parses the response body into JSON data.                 .
          })
          .then(function(pokemonList) { //the json() function always returns a promise so the second .then()statement will contain the callback function for the second promise
            console.log(pokemonList); //the actual json response
          })
          .catch(function() { //Error

          });

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