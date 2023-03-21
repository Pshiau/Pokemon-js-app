
//IIFE
let pokemonRepository = (function () {
    const pokemonList= [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const loader = document.getElementById("loading");
    
    function add(pokemon){
        if(
            //right type of data validation function
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
        showLoadingMessage();
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){ 
            // on Success getting pokemons
            hideLoadingMessage();
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                //console.log(pokemon);
            });
        }).catch(function(e){ 
            // on failure
            hideLoadingMessage();
            console.error(e);
        });

        button.createElement
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        showLoadingMessage();
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
             //add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
           
            
            let typesStr = '';
            details.types.forEach(function(t) {
                typesStr += t.type.name + " "
            });
            item.types = typesStr.trimEnd();
            console.log(typesStr)
            // Alternatively, can use Map function to display array items 
            // item.types = details.types.map(function(t){ return t.type.name});
            // console.log(item.types)
            
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showLoadingMessage()
    {
        console.log("loading");
        loader.classList.remove("hide-loader");
    };

    function hideLoadingMessage()
    {
        console.log("hiding loading msg");
        loader.classList.add("hide-loader");
    };

    //using the function keyword, then only return the key-value pairs 
   
    return {
        add: add,
        getAll:getAll,
        addListItem:addListItem,
        showDetails:showDetails,
        loadList:loadList,
        loadDetails:loadDetails,
        showLoadingMessage:showLoadingMessage,
        hideLoadingMessage:hideLoadingMessage

    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
});


});
    
    