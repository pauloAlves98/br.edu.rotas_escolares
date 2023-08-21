window.onload = function () {
  const rotaInput = document.getElementById("rotas");
  const loadingIndicator = document.getElementById("loadingIndicator");
  var selectedRota = "default";
  //Preenchimento de rotas
  function preencherRotas() {
    const rotaSelect = document.getElementById("rotas");
    // Preencha as opções com valores de ROTA 1 a ROTA 33
    for (let i = 1; i <= 33; i++) {
      const rota = "ROTA " + i;
      const option = new Option(rota, rota);
      rotaSelect.appendChild(option);
    }
  }
  preencherRotas();

  //FAZER METODO
  // Adicione um evento de mudança à opção selecionada
  rotaInput.addEventListener("change", function () {
    rotaInput.disabled = true;
    selectedRota = this.value;
    console.log("Rota selecionada: " + selectedRota);
    loadingIndicator.style.display = "flex";

    setTimeout(() => {
      // Esconda o indicador de loading após o atraso (simulando o carregamento de dados)
      loadingIndicator.style.display = "none";
      rotaInput.disabled = false; 
      //se encontrou a rota ou não    
      addCardRota(selectedRota);  

    }, 500);
  });

  // Função para adicionar o card
  function addCardRota(rota) {
    let elementContainer = document.getElementById("detalhes_rotas");

    if(selectedRota=='default') 
    elementContainer.innerHTML = '<h1>Selecione um Rota</h1>';
    else   
      elementContainer.innerHTML = preencherCardRotas(rota);
  }

 function preencherCardRotas(rota){
  let valorFixo = ROTAS[rota].valorFixo;
  let kmPavimentado = ROTAS[rota].kmPavimentado;
  let kmNaoPavimentado = ROTAS[rota].kmNaoPavimentado;
  let valorKmPavimentado =  ROTAS[rota].valorKmPavimentado;
  let valorKmNaoPavimentado = ROTAS[rota].valorKmNaoPavimentado;
  let baseStringHtml = '';

  //22 dias
  if(valorFixo==null)
    return "<h1 class='centro-centro col-12'>Em branco</h1>"

  for(let i=1; i<23;i++){
    baseStringHtml+='<div class="row centro_centro">'+
    '<div class="card voutchers col-12">'+
      '<div class="voutcher-divider">'+
        '<div class="voutcher-right text-center border-left">'+
          '<h5 class="quant-dia-rodado">'+i+'</h5>'+
          '<span class="off">'+ (i>1? "Dias Rodados":"Dia Rodado")+'</span>'+
        '</div>'+
        '<div class="voutcher-left text-center">'+
          '<span class="voutcher-name">Valor a Receber</span>'+
          '<h5 class="valor-receber">'+formatCurrency((valorFixo + i*((kmPavimentado*valorKmPavimentado)+(kmNaoPavimentado*valorKmNaoPavimentado))))+'</h5>'+
        '</div>'+
      '</div>'+
   '</div>'+
  '</div>';
  }

  return baseStringHtml;
}

}

// function capturarValores(valor) {
//  let valor_convertido = parseFloat(
//     document
//       .getElementById("valorFixo")
//       .value.replace(/[R$\s.]/g, "")
//       .replace(",", ".")
//   ); //converte para float!
//   return valor_convertido;
// }

// Atualize o componente Selectpicker após adicionar as opções
// const realInputs = document.querySelectorAll(".real-input");
// realInputs.forEach((input) => {
//   input.addEventListener("input", formatCurrency);
// });

function formatCurrency(valor) {
  const formattedValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
  return formattedValue;
}
