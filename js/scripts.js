let pokemonList=[{name: "Bulbasaur", height: .7, type: ['grass', 'poison'] },
                 {name: "Charizard", height: 1.7, type: ['fire', 'flying'] },
                 {name: "Butterfree", height: 1, type: ['bug', 'flying']}];

                 // Initialization "let i = 0", the condition "i < pokemonList.length;"
                 // and the action "i++ which is the equivalent of i = i + 1"
                 for (let i = 0; i < pokemonList.length; i++) {
                   document.write(pokemonList[i].name + (' height: ') + pokemonList[i].height);
                    //This handles heights greater than or equal to 1.7
                   if (pokemonList[i].height >= 1.7) {
                     document.write(' - Wow, that\'s a big Pokemon!');
                   
