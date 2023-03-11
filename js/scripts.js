
//IIFE
let pokemonRepository = (function () {
    let pokemonList= [
        {name:"Bulbasaur",types:["grass","poison"],height:0.7,weight:6.9},
        {name:"Charmander",types:["fire"],height:0.6,weight:8.5},
        {name:"Squirtle",types:["water"],height:0.5,weight:9},
        {name:"Ivysaur",types:["grass","poison"],height:1,weight:13},
    ];
    //added validation typeof to ensure the right data types will be added in the array 
    function add(pokemon){
        if(
            //noted "in" used
            typeof pokemon === "object" && "name" in pokemon 
            && "height" in pokemon 
            && "types" in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log('wrong data type')
        }
    }
    function getAll(){
        return pokemonList;
    }
    //create addListItem function that is assigned to elements, tag class and style 
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
        console.log(pokemon.name)
    }

    //using the function keyword, then only return the key-value pairs 
   
    return {
        add: add,
        getAll:getAll,
        addListItem:addListItem,
        showDetails:showDetails,
    };
})();



//add() a new pokemon to the List 
pokemonRepository.add({ name:"Charmeleon",types:["fire"],height:1.1,weight:19});
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });


//calling pokemonList from getAll() 
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

    