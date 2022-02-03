const gen1 =[1, 151, 'gen1'];
const gen2 =[152, 251, 'gen2'];
const gen3 =[252, 386, 'gen3'];
const gen4 =[387, 493, 'gen4'];
const gen5 =[494, 649, 'gen5'];
const gen6 =[650, 721, 'gen6'];
const gen7 =[722, 809, 'gen7'];
const todasGens = [gen1, gen2, gen3, gen4, gen5, gen6, gen7, ]
const buttons = document.getElementById('buttons');

function addendTyper(data1,appendend) {
  const divType = document.createElement('div');
  const imgType1 = document.createElement('img');
  const imgType2 = document.createElement('img');

  if (data1.types.length === 1) {
    imgType1.src = `./iconsTypes/${data1.types[0].type.name}.png`
    imgType1.style.width = '80px';
    divType.appendChild(imgType1);
    li.appendChild(divType);
  }
  if (data1.types.length === 2) {
    imgType1.src = `./iconsTypes/${data1.types[0].type.name}.png`
    imgType1.style.width = '80px';
    imgType2.src = `./iconsTypes/${data1.types[1].type.name}.png`
    imgType2.style.width = '80px';
    divType.appendChild(imgType1);
    divType.appendChild(imgType2);
    appendend.appendChild(divType);
  }
}

function append(data) {
  const ul = document.querySelector('ul');
  
  const li = document.createElement('li');
  const divNome = document.createElement('div');
  const divImage = document.createElement('div');

  const img = document.createElement('img');

  divNome.innerHTML = data.name;
  divNome.className = 'names';
  img.src = data.imageUrl;
  divImage.appendChild(img);

  li.appendChild(divNome);
  li.appendChild(divImage);

  addendTyper(data,li);

  li.addEventListener('click', ()=> {
    document.getElementById('pkmnSelect').innerText = data.name;
    const mapAbilities = data.abilities;
    document.getElementById('pkmnSelectAbilities').innerText = mapAbilities;
    document.getElementById('pkmnSelectHeight').innerText = data.height;
    document.getElementById('pkmnSelectWeight').innerText = data.weight;
    const teste = document.getElementById('pkmnSelectType')
    while (teste.firstChild) {
      teste.removeChild(teste.lastChild);
    }
    addendTyper(data, document.getElementById('pkmnSelectType'));

    const imagesWhile = document.getElementById('pkmnSelectImg');
    while (imagesWhile.firstChild) {
      imagesWhile.removeChild(imagesWhile.lastChild);
    }
    const imgF = document.createElement('img');
    imgF.src = data.oficialArt;
    imagesWhile.appendChild(imgF);

    const imagesWhileS = document.getElementById('pkmnSelectImgShinny');
    while (imagesWhileS.firstChild) {
      imagesWhileS.removeChild(imagesWhileS.lastChild);
    }
    const imgFS = document.createElement('img');
    imgFS.src = data.frontShiny;
    imagesWhileS.appendChild(imgFS);
    
    })
  li.id = "firstPageText";
  ul.appendChild(li);
}

function extractNameAndImage(pokemonData) {
  return {
    name: `${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`,
    imageUrl: pokemonData.sprites.front_default,
    types: pokemonData.types,
    abilities: pokemonData.abilities.map((each) => each.ability.name),
    height: `${(pokemonData.height*0.1).toFixed(1)} m`,
    weight: `${(pokemonData.weight*0.1).toFixed(1)} kg`,
    oficialArt: pokemonData.sprites.other['official-artwork'].front_default,
    frontShiny: pokemonData.sprites.front_shiny
  };
}

async function fetchPokemon(pokemoNumber) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemoNumber}`);
    const data = await response.json();
    const pokemon = extractNameAndImage(data);

    append(pokemon);
  } catch (error) {
    console.log(error);
  }
}


async function fetchPokemonData(pokemoNumber) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemoNumber}`);
  const data = await response.json();
  
  return data;
}

async function fetchPokemonAsyncAwait(gen = [1 , 151]) {
  try {
    const listOfFunctions = [];
    for (let index = gen[0]; index <= gen[1]; index += 1 ) {
      listOfFunctions.push(await fetchPokemon(`${index}`))
    }
    const pokemonDataList = await Promise.all(listOfFunctions);

    const pokemonList = pokemonDataList.map(extractNameAndImage);

    pokemonList.forEach(append);
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  fetchPokemonAsyncAwait();
  todasGens.forEach((cada) => {
    document.getElementById(cada[2]).addEventListener('click', ()=>{
      document.querySelectorAll('li').forEach((each) => each.remove())
      fetchPokemonAsyncAwait(cada)
      document.getElementById('genName').innerText = `Pokedex ${cada[2][0].toUpperCase()}${cada[2].slice(1,3)} ${cada[2][3]}`
    })
  })
};
