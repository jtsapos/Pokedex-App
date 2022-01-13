let pokemonList = [{
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
];

// Initialization "let i = 0", the condition "i < pokemonList.length;"
// and the action "i++ which is the equivalent of i = i + 1"
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<br>' + pokemonList[i].name + (' , height: ') + pokemonList[i].height);
  //This handles heights greater than or equal to 1.7
  if (pokemonList[i].height >= 1.7) {
    document.write(' - Wow, that\'s a big Pokemon!');}
    //document.write(pokemonList[i].name + ('  (height: ') + pokemonList[i].height + ')');
    // This handles heights greater than 1 and less than 1.7
    else if (pokemonList[i].height < 1.7 && pokemonList[i].height > 1) {
      document.write(' - This is a medium size Pokemon!');
    }
    //this handles heights less than or eaual to 1
    else if (pokemonList[i].height <= 1) {
      document.write(' - This is a small Pokemon!');
    }

  }
