
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
            typeof pokemon === 'object' &&'name' 
        ){
            pokemonList.push(pokemon);
        }else{
            console.log('wrong data type')
        }
    }
    function getAll(){
        return pokemonList;
    }
    //using the function keyword, then only return the key-value pairs 
   
    return {
        add: add,
        getAll:getAll
    };
})();



//using add() to add a new pokemon to the List 
pokemonRepository.add({name:"Charmeleon",type:["fire"],height:1.1,weight:19});


//calling pokemonList from getAll() 
//and then use forEach() to iterate over the name & height of Pokemon from list
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + "m)</br>"); 
    });

    