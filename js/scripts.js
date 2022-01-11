let pokemonList=[{name: "Bulbasaur", height: .7, type: ['grass', 'poison'] },
                 {name: "Charizard", height: 1.7, type: ['fire', 'flying'] },
                 {name: "Butterfree", height: 1, type: ['bug', 'flying']}];

                 // Initialization "let i = 0", the condition "i < pokemonList.length;"
                 // and the action "i++ which is the equivalent of i = i + 1"
                 for (let i = 0; i < pokemonList.length; i++) {
                   document.write('<br>' + pokemonList[i].name + (' height: ') + pokemonList[i].height);
                    //This handles heights greater than or equal to 1.7
                   if (pokemonList[i].height >= 1.7) {
                     document.write(' - Wow, that\'s a big Pokemon!');
                     //document.write(pokemonList[i].name + ('  (height: ') + pokemonList[i].height + ')');
                     // This handles heights between 1 and 1.7
                     if (pokemonList[i].height < 1.7 && pokemonList[i].height >= 1) {
                       document.write(' - This is a medium size Pokemon!');
                     }
                     //this handles heights less than 1
                     else if (pokemonList[i].height < 1) {
                       document.write(' - This is a small Pokemon!');
                     }
                     else if (pokemonList[i].height > 1.7){
                       //this handlles any height greater than 1.7
                       document.write(' - This is a tremendous Pokemon!');
                     }
                   }
}
