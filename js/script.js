/**passar classes do html para Variaveis */
const nomepoke = document.querySelector('.pokemon__name');
const numpoke = document.querySelector('.pokemon__number');
const imgpok = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
/** Variavel para pokemon default, o primeiro que aparecer na tela */
let searchPokemon = 52;

/** função fetchPokemon para pegar os dados da API, e repassar para em .json*/
/**condição se houver comunicação e existir o pokemon requisitado, irá mostrar na tela */
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if(APIResponse.status == 200){
  const data = await APIResponse.json();
  return(data);
  }
}


/** variaveis recebem e retornam dados da api, id numero e imagem */
const renderPokemon = async (pokemon) =>{
  nomepoke.innerHTML = 'Carregando';
  numpoke.innerHTML = '';
  const data = await fetchPokemon(pokemon);
  if(data){
  nomepoke.innerHTML = data.name;
  numpoke.innerHTML = data.id;
  imgpok.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  searchPokemon = data.id;
  }
  else{
    nomepoke.innerHTML = 'Nome Inválido';
    numpoke.innerHTML = 'ERR0R';
    imgpok.src = '';
  }
}

/**Botao input */
form.addEventListener('submit', (event) =>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = ('');
  }
) 
/**botoes para navegar por id */
btnPrev.addEventListener('click', () =>{
  if(searchPokemon >1){
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
}});
btnNext.addEventListener('click', () =>{
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
/**retorno da função para manter um pokemon exibido em default */
renderPokemon(searchPokemon);
