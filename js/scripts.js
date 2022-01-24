let pokemonRepository = (function() { //creates an IIFE for pokemon list

      let pokemonList = []
      let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

      function add(pokemon) { // function to add a pokemon to the pokemonList
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "height" in pokemon &&
          "types" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          document.write("pokemon is not correct");
        }
      }

      function getAll() {
        return pokemonList;
      }

      function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list"); //create new varible pokemonList wch takes queryselector wch is .pokemon-list class(frm index.html)
        let listpokemon = document.createElement("li"); //after creating ul element we create an li element using createElement
        let button = document.createElement("button"); //inside each li we create a button tag with createElement
        button.innerText = pokemon.name; //renders the button, adds pokemon name inside the button
        button.classList.add("button-class"); //add css class to style the button from styles.css
        listpokemon.appendChild(button); //calls the listpokemon and appends the child button to the li (ea button is an li)
        pokemonList.appendChild(listpokemon); //now we append the li to the ul (.pokemon-List)(which is the main element or parent element)
        function buttonEventListener(button, pokemon) { // When the user clicks the selected button, the click function passed as the second parameter in addEventListener will be called to show pokemon details.
          button.addEventListener('click', function() {
            showDetails(pokemon);
          });
        } // Adds an event listener to the created button above  //buttonEventListener(button, pokemon);}
        function loadList() {
          return fetch(apiUrl).then(function(response) {
            return response.json();
          }).then(function(json) {
            json.results.forEach(function(item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
              console.log(pokemon);
            });
          }).catch(function(e) {
            console.error(e);
          })
        }


        // function that prints pokemon details onto console
        function showDetails(pokemon) {
          console.log(pokemon);
        }


        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem
        };

      })();

    //console.log(pokemonRepository.getAll());
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);

    });