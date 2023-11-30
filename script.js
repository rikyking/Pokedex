async function getRandomPokemon() {
  const pokeNum = document.getElementById("pokeNum");
  let pokeObj = checkPokeNum(pokeNum.value); //obj
  console.log(pokeObj);
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokeObj.num
  );
  //  .then((response) => response.json())
  //    .then((json) => console.log(json));

  const data = await response.json();
  console.log(data);
  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.innerHTML = "";
  pokeNum.value = "";

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

  pokeTag.textContent = "# " + pokeObj.num;
  pokeTag.classList.add("p-tag");

  pokemonCard.appendChild(pokeTag);
  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(pokemonImg);
  pokemonCard.appendChild(pokemonImgBack);
  pokemonContainer.appendChild(pokemonCard);
  const divSound = document.createElement("div");
  pokemonCard.appendChild(divSound);
  const region = pokeObj.region;
  let soundN = 0;
  if (pokeObj.zeroNum == 2) {
    soundN = "00" + pokeObj.num;
  } else if (pokeObj.zeroNum == 1) {
    soundN = "0" + pokeObj.num;
  } else {
    soundN = pokeObj.num;
  }
  divSound.innerHTML = `<audio controls>
    <source src='./assets/sounds/${region}/${soundN} - ${
    data.name.charAt(0).toUpperCase() + data.name.slice(1)
  }.wav' type='audio/wav'>
    Your browser does not support the audio element.
  </audio>`;

  const divTot = document.createElement("div");
  divTot.classList.add("div-tot");
  pokemonCard.appendChild(divTot);

  const divAbil = document.createElement("div");
  divAbil.classList.add("div-abil");
  

  const title = document.createElement("h2");
  title.textContent = "Ability";
  divAbil.appendChild(title);
  for (let i = 0; i < data.abilities.length; i++) {
    const abl = document.createElement("p");
    abl.textContent =
      "Ability n." +
      (i + 1) +
      " : " +
      data.abilities[i].ability.name.charAt(0).toUpperCase() +
      data.abilities[i].ability.name.slice(1);
    divAbil.appendChild(abl);
  }
  const height = document.createElement("p");
  height.textContent = "Height: " + data.height;
  divAbil.appendChild(height);

  const divStats = document.createElement("div");
  divStats.classList.add("div-abil");

  const title1 = document.createElement("h2");
  title1.textContent = "Stats";
  divStats.appendChild(title1);
  for (let i = 0; i < data.stats.length; i++) {
    const sts = document.createElement("p");
    sts.textContent =
      data.stats[i].stat.name.charAt(0).toUpperCase() +
      data.stats[i].stat.name.slice(1) +
      ": " +
      data.stats[i].base_stat;
    divStats.appendChild(sts);
  }
  divTot.appendChild(divStats);
  divTot.appendChild(divAbil);
}

function ceckPokeID(id) {
  if (id > 0 && id < 10) {
    return 2;
  } else if (id > 9 && id < 100) {
    return 1;
  } else if (id == "123456789") {
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = "";
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
       <video id="myvideo" controls autoplay>
          <source src="assets/sounds/-.mp4"></source>
       </video>`;
    pokemonContainer.appendChild(pokemonCard);
  }
  return 0;
}

function checkPokeNum(pokeNum) {
  let pokeSound = {
    zeroNum: 0,
    num: pokeNum,
    region: "",
  };
  if (pokeNum >= 1 && pokeNum <= 151) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "01 - Kanto";
  } else if (pokeNum >= 152 && pokeNum <= 251) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "02 - Johto";
  } else if (pokeNum >= 252 && pokeNum <= 386) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "03 - Hoenn";
  } else if (pokeNum >= 387 && pokeNum <= 493) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "04 - Sinnoh";
  } else if (pokeNum >= 494 && pokeNum <= 649) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "05 - Unova";
  } else if (pokeNum >= 650 && pokeNum <= 718) {
    pokeSound.zeroNum = ceckPokeID(pokeNum);
    pokeSound.region = "06 - Kalos";
  } else if (pokeNum == "123456789") {
    ceckPokeID(pokeNum);
    return -1;
  } else {
    alert("Pokemon non trovato. Mi dispiace 😥");
    document.getElementById("pokeNum").value = "";
    return -1;
  }
  return pokeSound;
}
document.getElementById("btn").addEventListener("click", getRandomPokemon);

document.addEventListener("DOMContentLoaded", () => {
  let random = Math.floor(Math.random() * 10000);
  console.log(random);
  if (random >= 670 && random <= 820) {
    alert("Prova ad inserire in input il seguente numero: 123456789 😎");
  }
});
