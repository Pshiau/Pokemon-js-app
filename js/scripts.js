
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
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        //add event listener to the button
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
           showModal(pokemon.name,"Height: " + pokemon.height/10+ "m"+"<br>"+ "Type: "+ pokemon.types, pokemon.imageUrl);
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
        showLoadingMessage();
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage();
             //add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
           
            
            let typesStr = " ";
            details.types.forEach(function(t) {
                typesStr += t.type.name + "  "
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

    function showLoadingMessage() {
        console.log("loading");
        loader.classList.remove("hide-loader");
    };

    function hideLoadingMessage(){
        console.log("hiding loading msg");
        loader.classList.add("hide-loader");
    };

    function showModal(title,text,image) {
      
        modalContainer.innerHTML = " ";
        let modal = document.createElement('div');
        modal.classList.add("modal");

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener('click',hideModal);


        // what is the different between innerText and innerHTML?
        let titleElement = document.createElement ('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement ('p');
        contentElement.innerHTML = text;

        // load images
        let imageElement = document.createElement("img");
        imageElement.src =image

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

    }

    function hideModal(){
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) =>{
        let modalContainer = document.querySelector
        ('#modal-container');
        if (e.key === 'Escape' && 
        modalContainer.classList.contains('is-visible')){
            hideModal();
        }
     });

     modalContainer.addEventListener('click', (e) =>{
        let target = e.target;
        if (target === modalContainer){
            hideModal();
        }

    });
        

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


    
    