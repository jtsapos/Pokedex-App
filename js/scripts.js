let pokemonRepository = (function() { //creates an IIFE for pokemon list

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { // function to add a pokemon to the pokemonList
    if (
      typeof pokemon === "object" &&
      "name" in pokemon //&& //if pokemon is an object and has a name we will push the pokemon in the repository
      //"detailsUrl" in pokemon
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
    //function buttonEventListener(button, pokemon) { // When the user clicks the selected button, the click function passed as the second parameter in addEventListener will be called to show pokemon details.
    button.addEventListener("click", function(event) { //event listener which listens for a mouseclick, then executes the show details function for the pokemon
      showDetails(pokemon);
    });
  } //buttonEventListener(button, pokemon);} // Adds an event listener to the created button above

  function loadList() { //promise function which fetches the apiUrl
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) { //json is basically the entire result of the apiUrl
      json.results.forEach(function(item) { //.results is the key
        let pokemon = {
          name: item.name, //from the api pokemon list here we are retrieving the pokemon name
          detailsUrl: item.url //from the api pokemon list here we are retrieving the pokemon details (url)
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl; //detailsUrl comes from loadList function above which collects the details for each pokemon
    return fetch(url).then(function(response) { //promise fetch(url) collects all the details through the response and passes
      return response.json(); //them through to the json
    }).then(function(details) { //once we get the json we chain another promise .then function which collects all the details
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default; //item is coming from the apiUrl and we're collecting details from the sprites characteristics
      item.height = details.height; //collecting height data
      item.types = details.types; //collecting type data
    }).catch(function(e) {
      console.error(e);
    });
  }

  // function that prints pokemon details onto console
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() //loads the pokemon details and prints to the console
      {
        console.log(item);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() { //passes the two functions below through it to give us the list of pokemons
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

  });
});