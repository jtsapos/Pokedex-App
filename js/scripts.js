let pokemonRepository = (function() {

  let pokemonList = [

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
    }
  ]

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    add: add,
    getAll: getAll
  };

})();
//console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function(item) {
  document.write("<br>" + item.name + " : " + item.height + " : " + item.type);
  if (item.height >= 1.7)
    document.write(' - Wow, that\'s a big Pokemon!');
});