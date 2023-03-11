
//IIFE
let pokemonRepository = (function () {
    let pokemonList= [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    
    function add(pokemon){
        if(
            //noted "in" used
            typeof pokemon === "object" && 
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log('wrong data type')
        }
    }
    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText =pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //add event listener to the button
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }

    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          //add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          //types show array, to be opimised**
        }).catch(function (e) {
          console.error(e);
        });
      }


    //using the function keyword, then only return the key-value pairs 
   
    return {
        add: add,
        getAll:getAll,
        addListItem:addListItem,
        showDetails:showDetails,
        loadList:loadList,
        loadDetails:loadDetails,

    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});


});
    
    