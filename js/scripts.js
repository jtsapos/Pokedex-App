let pokemonRepository = (function() {

  let repository = [

    {
      name: "Bulbasaur",
      height: .7,
      type: ['grass', 'poison']
    },
    {
      name: "Charizard",
      height: 1.7,
      type: ['fire', 'flying']
    },
    {
      name: "Butterfree",
      height: 1,
      type: ['bug', 'flying']
    },
    {
      name: "Weedle",
      height: .3,
      type: ['bug', 'poison']
    },
    {
      name: "Fearow",
      height: 1.2,
      type: ['flying', 'normal']
    },
    {
      name: "Nidoking",
      height: 1.4,
      type: ['ground', 'poison']
    },
  ];

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.queryselector(".pokemon-list"); //create new varible pokemonList wch takes queryselector wch is .pokemon-list class(frm index.html)
    let listpokemon = document.createElement("li"); //after creating ul element we create an li element using createElement
    let button = document.createElement("button"); //inside each li we create a button tag with createElement
    button.innerText = item.name; //renders the button, adds pokemon name inside the button
    button.classlist.add("button-class"); //add css class to style the button from styles.css
    listpokemon.appendChild(button); //calls the listpokemon and appends the child button to the li (ea button is an li)
    pokemonList.appendChild(listpokemon); //now we append the li to the ul (.pokemon-List)(which is the main element or parent element)
  }

  function add(pokemon) {
    repository.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

});