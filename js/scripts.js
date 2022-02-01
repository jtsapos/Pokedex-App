let pokemonRepository = (function() { //creates an IIFE for pokemon list
  let modalContainer = document.querySelector('#modal-container'); //acts as a global variable where all the functions below have access to it.
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function add(pokemon) { // function to add a pokemon to the pokemonList
    if (typeof pokemon === "object" && "name" in pokemon) { //&& //if pokemon is an object and has a name we will push the pokemon in the repository
      //"detailsUrl" in pokemon
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
    let pokemonImage = document.createElement("img"); //here we create an image tag
    //pokemonImage.src = pokemon.imageUrl;
    let pokemonName = pokemon.name;
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
        //console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl; //detailsUrl comes from loadList function above which collects the details for each pokemon
    return fetch(url).then(function(response) { //promise fetch(url) collects all the details through the response and passes
      return response.json(); //them through to the json
    }).then(function(details) { //once we get the json we chain another promise .then function which collects all the details
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default; //item is coming from the apiUrl and we're collecting details from the sprites characteristics
      pokemon.height = details.height; //collecting height data
      pokemon.types = details.types; //collecting type data
    }).catch(function(e) {
      console.error(e);
    });
  }

  // function that prints pokemon details onto console
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() //loads the pokemon details and prints to the console
      {
        showModal(pokemon);
      });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container'); //function selects the id #modal-container from index.html

    modalContainer.innerHTML = ''; //clears all existing modal content

    let modal = document.createElement('div'); //here the modal will create a div element in the html
    modal.classList.add('modal'); //and this div will take a class called modal

    // Add the new modal content
    let closeButtonElement = document.createElement('button'); //creates the close button from html
    closeButtonElement.classList.add('modal-close'); // 'modal-close' from styles.css
    closeButtonElement.innerText = 'Close'; //'close' displays as text in the button
    closeButtonElement.addEventListener('click', hideModal); //adds event listener to call the hideModal function below when close button is clicked

    let titleElement = document.createElement('h1'); //created h1 title element from html to display title
    titleElement.innerText = pokemon.name; //displays name of the pokemon

    let contentElement = document.createElement('p'); //now we create the paragraph element (from html)
    contentElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img'); // now we Create an <img> element
    imageElement.src = pokemon.imageUrl; // setting `src` property to set the actual element's `src` attribute

    //Now we need to append these elements to the modal
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal); //then we append the modal(child)(includes 3 children-button,name,ht,image) to the modal container(parent)
    //as a parent element
    modalContainer.classList.add('is-visible'); //displays modal container
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible'); // takes the is-visible class from css
  }

  //document.querySelector('#show-modal').addEventListener('click', () => {
  //  showModal();
  //});

  //using the Escape key to hide the modal
  window.addEventListener('keydown', (e) => { //keydown is a pre-defined event listener for when you click on any key on the keyboard
    let modalContainer = document.querySelector('#modal-container'); //keydown will take the modal container and if the key is escape it calls hideModal
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  //// Since this is also triggered when clicking INSIDE the modal,We only want to close if the user clicks directly on the overlay
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //when the promise returned by fetch() is resolved,the response from the external source will be passed to the callback function in the .then()block
  fetch('https://pokeapi.co/api/v2/pokemon/').then(function(response) {
    return response.json(); //from there the promise is passed through the json()key, which holds a function that parses the response body into JSON data.                 .
  }).then(function(pokemonList) { //the json() function always returns a promise so the second .then()statement will contain the callback function for the second promise
    console.log(pokemonList); //the actual json response
  }).catch(function() { //Error

  });

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