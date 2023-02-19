let pokemonList=[
    {name:"Bulbasaur",types:["grass","poison"],height:0.7,weight:6.9},
    {name:"Charmander",types:["fire"],height:0.6,weight:8.5},
    {name:"Squirtle",types:["water"],height:0.5,weight:9},
    {name:"Ivysaur",types:["grass","poison"],height:1,weight:13},
]

let text1="";
// hightlighting pokemon hight greater or equal to 1m;
let text2="";
//small pokemons

for ( let i=0; i< pokemonList.length; i++)
//created a "for" loop that iterates over each item in pokemonList
{
    if(pokemonList[i].height>=1){
        text1=text1+" "+pokemonList[i].name+" (height: "+pokemonList[i].height+"m) - Wow, that's big! "+"<br>";
    }else{
        text2=text2+" "+pokemonList[i].name+" (height: "+pokemonList[i].height+"m) "+"<br>";
    }
    
}
document.write('<h1>'+text1+'</h1>'+text2);




