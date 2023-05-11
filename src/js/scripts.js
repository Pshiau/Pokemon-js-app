//IIFE
let pokemonRepository = (function () {
    const pokemonList= [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const loader = document.getElementById("loading");
    const modalContainer = document.querySelector('#modal-container');
  
    
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
        button.classList.add("button-class","show-modal","btn","btn-outline-info");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#modal-container");

        listpokemon.classList.add("list-group-item");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        
        //add event listener to the button
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(pokemonDetails){
            console.log("POkesdfsdmonDetails", pokemonDetails)
           //showModal(pokemon.name,"Height: " + pokemon.height/10+ "m"+"<br>"+ "Type: "+ pokemon.types, pokemon.imageUrl);
           showModal(pokemonDetails);
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
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        const pokemonDetails = {name: item.name};
        showLoadingMessage();
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage();
             //add the details to the item
            pokemonDetails.imageUrl = details.sprites.front_default;
            pokemonDetails.height = details.height;
            pokemonDetails.weight = details.weight;
            
           
            
            let typesStr = " ";
            details.types.forEach(function(t) {
                typesStr += t.type.name + "  "
            });
            pokemonDetails.types = typesStr.trimEnd();
            console.log(pokemonDetails)
            return pokemonDetails;

            // Alternatively, can use Map function to display array items 
            // item.types = details.types.map(function(t){ return t.type.name});
            // console.log(item.types)
            
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showLoadingMessage() {
        console.log("loading");
        loader.classList.remove("hide-loader");
    };

    function hideLoadingMessage(){
        console.log("hiding loading msg");
        loader.classList.add("hide-loader");
    };


    function showModal(pokemonDetails) {
        // Read modal parts
        const modalTitle = document.querySelector(".modal-title");
        const modalBody = document.querySelector(".modal-body");

        //clean modal content first
        modalBody.innerText = ''


        // attach details to it
        modalTitle.innerText = pokemonDetails.name;
        const pokeImage = document.createElement("img");
        pokeImage.src = pokemonDetails.imageUrl;
        const pokeWeight = document.createElement('div');
        pokeWeight.innerHTML = `<p><span style="font-weight:bold">Weight:</span> ${pokemonDetails.weight}lbs.</p>`
        const pokeHeight = document.createElement('div');
        pokeHeight.innerHTML = `<p><span style="font-weight:bold">Height:</span> ${pokemonDetails.height}</p>`
        const pokeTypes = document.createElement('div');
        pokeTypes.innerHTML=`<p><span style="font-weight:bold">Types:</span> ${pokemonDetails.types}</p>`

        modalBody.append(pokeImage);
        modalBody.append(pokeHeight);
        modalBody.append(pokeWeight);
        modalBody.append(pokeTypes);

    }

    function hideModal(){
        modalContainer.classList.remove('is-visible');
    }

    //using the function keyword, then only return the key-value pairs 
    return {
        add: add,
        getAll:getAll,
        addListItem:addListItem,
        showDetails:showDetails,
        loadList:loadList,
        loadDetails:loadDetails,
        showLoadingMessage:showLoadingMessage,
        hideLoadingMessage:hideLoadingMessage,
        showModal:showModal,
        hideModal:hideModal,

    };
})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


    
    