const cardsContainer = document.querySelector('.cards-container')
const characters = document.querySelectorAll(".character");
const images = document.querySelectorAll("img");
const characterId = document.querySelectorAll(".character-id");
const generation = document.querySelectorAll(".generation");

const searchButton = document.querySelector('.pokedex-search-button')

const selectGeneration = document.querySelectorAll(".generations");

const cards = document.querySelectorAll(".cards");

const search = document.querySelector("#search");

// result card
const resultCard = document.querySelector(".result-card");
const resultCharacter = document.querySelector(".result-character");
const resultImage = document.querySelector("img");
const resultCharacterId = document.querySelector(".result-character-id");
const resultGeneration = document.querySelector(".result-generation");
const resultType = document.querySelector(".result-type");
 

selectGeneration.forEach((each) => {
  each.addEventListener("click", getPokemons);
});

let offset = 0;
let limit = 0;
let pokemonId = 0;
let theId = 0;
let pokemonTypes = 0;

let pokemonCards;

let thePokemonType;




function getPokemons() {

cardsContainer.innerHTML = ''



  offset = 0;
  limit = 0;
  hidden();

  switch (this.innerText) {
    case "Gen 1":
      offset = 0;
      limit = 151;
      break;
    case "Gen 2":
      offset = 151;
      limit = 251;
      break;
    case "Gen 3":
      offset = 251;
      limit = 386;
      break;
    case "Gen 4":
      offset = 386;
      limit = 493;
      break;
    case "Gen 5":
      offset = 493;
      limit = 649;
      break;
    case "Gen 6":
      offset = 649;
      limit = 721;
      break;
    case "Gen 7":
      offset = 721;
      limit = 809;
      break;
    case "Gen 8":
      offset = 809;
      limit = 905;
      break;
    case "Gen 9":
      offset = 905;
      limit = 1010;
      break;
    default:
      offset = 0;
      limit = 151;
      break;
  }

  pokemonId = offset + 1;
  pokemonTypes = offset + 1;
  theId = offset + 1;


  fetch(
    `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())

    .then((data) => {
      for (i = 0; i < limit - offset; i++) {


        pokemonCards = document.createElement('div')
        pokemonCards.classList.add('pokemonCard')
       
        const pokemonImage = document.createElement('img')

        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId++}.png`;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonTypes++}/`)
        .then((response) => response.json())
  
        .then((data) => {
          thePokemonType.innerText = data.types[0].type.name;
  
          try {
            if (data.types[1].type.name) {
              thePokemonType.innerText =
                data.types[0].type.name + " " + data.types[1].type.name;
            }
          } catch (e) {
            return null;
          }
        });
        
       
        const pokemonGeneration = document.createElement('span')
        switch (limit) {
          case 151:
            pokemonGeneration.innerText = 1;
            break;
          case 251:
            pokemonGeneration.innerText = 2;
            break;
          case 386:
            pokemonGeneration.innerText = 3;
            break;
          case 493:
            pokemonGeneration.innerText = 4;
            break;
          case 649:
            pokemonGeneration.innerText = 5;
            break;
          case 721:
            pokemonGeneration.innerText = 6;
            break;
          case 809:
            pokemonGeneration.innerText = 7;
            break;
          case 905:
            pokemonGeneration.innerText = 8;
            break;
          case 1010:
            pokemonGeneration.innerText = 9;
            break;
          default:
            pokemonGeneration.innerText = 1;
        }


        pokemonGeneration.classList.add('pokemonGeneration')
       
        const pokemonDetails = document.createElement('div')
       
        const pokemonCharacter = document.createElement('p')
        pokemonCharacter.classList.add('pokemonCharacter')
        pokemonCharacter.innerText = data.results[i].name;

       
       
        const pokemonCharacterId = document.createElement('p')
        pokemonCharacterId.classList.add('pokemonCharacterId')
        pokemonCharacterId.innerText = theId++;
       
        const pokemonTypesContainer = document.createElement('div')
        pokemonTypesContainer.classList.add('pokemonTypesContainer')
       
        const thePokemonType = document.createElement('span')
        thePokemonType.classList.add('thePokemonType')
       
       
        pokemonCards.appendChild(pokemonImage)
        pokemonCards.appendChild(pokemonGeneration)
        pokemonCards.appendChild(pokemonDetails)
       
        pokemonDetails.appendChild(pokemonCharacter)
        pokemonDetails.appendChild(pokemonCharacterId)
        pokemonDetails.appendChild(pokemonTypesContainer)
       
        pokemonTypesContainer.appendChild(thePokemonType)
       
        cardsContainer.appendChild(pokemonCards)
        
      }
      
    });
}

function cardsVisibility() {
  for (i = 0; i < limit - offset - 1; i++) {
    visible = cards[i].classList.add("visible");
  }
  return visible;
}

const hidden = () => {
  resultCard.classList.remove("visible");
  cards.forEach((card) => {
    card.classList.remove("visible");
  });
};

function searchPokemon(e) {
  e.preventDefault()
  cardsContainer.innerHTML = '';
  hidden();
  resultCard.classList.remove("visible");
  fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1010`)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 1010; i++) {
        const searchId = +[i] + 1;
        if (search.value.toLowerCase() === data.results[i].name) {
          resultCharacter.innerHTML = data.results[i].name;

          resultCharacterId.innerText = searchId;

          resultImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            +[i] + 1
          }.png`;

          resultCard.classList.add("visible");

          fetch(`https://pokeapi.co/api/v2/pokemon/${searchId}/`)
            .then((response) => response.json())
            .then((data) => {
              resultType.innerText = data.types[0].type.name;

              if (searchId < 152) {
                resultGeneration.innerText = 1;
              } else if (searchId > 151 && searchId < 252) {
                resultGeneration.innerText = 2;
              } else if (searchId > 251 && searchId < 387) {
                resultGeneration.innerText = 3;
              } else if (searchId > 386 && searchId < 494) {
                resultGeneration.innerText = 4;
              } else if (searchId > 493 && searchId < 650) {
                resultGeneration.innerText = 5;
              } else if (searchId > 649 && searchId < 722) {
                resultGeneration.innerText = 6;
              } else if (searchId > 721 && searchId < 810) {
                resultGeneration.innerText = 7;
              } else if (searchId > 809 && searchId < 906) {
                resultGeneration.innerText = 8;
              } else if (searchId > 905 && searchId < 1011) {
                resultGeneration.innerText = 9;
              } else {
                resultGeneration.innerText = 0;
              }

              try {
                if (data.types[1].type.name) {
                  resultType.innerText =
                    data.types[0].type.name + " " + data.types[1].type.name;
                }
              } catch (e) {
                return null;
              }
            });
        }
      }
    });
}

window.onload = getPokemons

searchButton.addEventListener("click", searchPokemon);
