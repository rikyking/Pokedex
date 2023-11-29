async function getRandomPokemon() {
  let num = pokeNum();
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
  //  .then((response) => response.json())
  //    .then((json) => console.log(json));

  const data = await response.json();
  console.log(data);
  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.innerHTML = "";

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const pokemonImg = document.createElement("img");
  const pokemonImgBack = document.createElement("img");
  const pokeTag = document.createElement("p");

  pokemonImg.src = data.sprites.front_default;
  pokemonImg.alt = data.name;
  pokemonImg.classList.add("pokemon-img");

  pokemonImgBack.src = data.sprites.back_default;
  pokemonImgBack.alt = data.name;
  pokemonImgBack.classList.add("pokemon-img");

  pokeTag.textContent = "# " + num;
  pokeTag.classList.add("p-tag");

  pokemonCard.appendChild(pokeTag);
  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(pokemonImg);
  pokemonCard.appendChild(pokemonImgBack);
	pokemonContainer.appendChild(pokemonCard);
	
	const divTot = document.createElement("div");
  divTot.classList.add("div-tot");
  pokemonCard.appendChild(divTot);
	


	const divAbil = document.createElement("div");
	divAbil.classList.add("div-abil");
	divTot.appendChild(divAbil);

	const title = document.createElement("h2");
	title.textContent = "Ability"
	divAbil.appendChild(title);
	for (let i = 0; i < data.abilities.length; i++) {
    const abl = document.createElement("p");
    abl.textContent =
      "Ability n." + (i + 1) + " : " + data.abilities[i].ability.name.charAt(0).toUpperCase() + data.abilities[i].ability.name.slice(1);
    divAbil.appendChild(abl);
  }
  const height = document.createElement("p");
	height.textContent = "Height: " + data.height;
	divAbil.appendChild(height);

	const divStats = document.createElement("div");
	divStats.classList.add("div-abil");
	divTot.appendChild(divStats);

	const title1 = document.createElement("h2");
	title1.textContent = "Stats"
	divStats.appendChild(title1);
	for (let i = 0; i < data.stats.length; i++) {
		const sts = document.createElement("p");
		sts.textContent = (data.stats[i].stat.name.charAt(0).toUpperCase() + data.stats[i].stat.name.slice(1)) + ": " + data.stats[i].base_stat;
		divStats.appendChild(sts);
		console.log(sts.textContent);
	}

}

function radomNum(min, max) {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
}

function pokeNum() {
  const pokeNum = document.getElementById("pokeNum").value;
  if (pokeNum > 151) {
    alert("Devi inserire un numero compreso tra 1-151");
    return false;
  }
  return pokeNum;
}

document.getElementById("btn").addEventListener("click", getRandomPokemon);
