window.onload = function () {
  const rotaInput = document.getElementById("rotas");
  const loadingIndicator = document.getElementById("loadingIndicator");
  var selectedRota = "default";

  //Preenchimento de rotas no select component
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

    if (selectedRota == "default")
      elementContainer.innerHTML =
        "<div class='row col-12 text-white centro_centro fade-in'><h1 class='centro_centro col-12'>Selecione uma rota!</h1></div>";
    else {
      elementContainer.innerHTML = preencherCardRotas(rota);
    }
  }

  function preencherCardRotas(rota) {
    let valorFixo = ROTAS[rota].valorFixo;
    let kmPavimentado = ROTAS[rota].kmPavimentado;
    let kmNaoPavimentado = ROTAS[rota].kmNaoPavimentado;
    let valorKmPavimentado = ROTAS[rota].valorKmPavimentado;
    let valorKmNaoPavimentado = ROTAS[rota].valorKmNaoPavimentado;
    let baseStringHtml = "";
    let descricaoRota = ROTAS[rota].rota;

    //22 dias - Não existe detalhes para a rota
    if (valorFixo == null)
      return "<div class='row col-12 text-white centro_centro'><h1 class='centro_centro col-12'>Em branco</h1></div>";

    //add info da rota/botão Colapse
    //Primeiro adiciona o botão de collapse e pós o conteúdo dentro
    baseStringHtml = `
    <p class="row centro_centro col-12">
    <button id="btn-detalhes" class="btn btn-collapse " type="button" data-toggle="collapse" data-target="#collapseDetalhesRota"  aria-controls="collapseDetalhesRota" onclick="alterarNomeCollapse()">
      Ocultar Detalhes
    </button>
  </p>
  <div id="collapseDetalhesRota" class="collapse show" >

  <div class="card centro_centro card-desc-rota">${descricaoRota}</div>

  <div class="row centro_centro">
   
    <div class="card card-info">
      <div class="voutcher-divider">
        <div class="card-info-left text-center border-left">
        </div>

        <div class="card-info-right text-left">
          <span class="card-info-label">KM Pavimentado</span> 
          <h5 class="card-info-valor">${kmPavimentado
            .toString()
            .replace(".", ",")} km</h5>
        </div>
      </div>
    </div>

    <div class="card card-info">
    <div class="voutcher-divider">
      <div class="card-info-left text-center border-left">
      </div>

      <div class="card-info-right text-left">
        <span class="card-info-label">KM Não Pavimentado</span> 
        <h5 class="card-info-valor">${kmNaoPavimentado
          .toString()
          .replace(".", ",")} km</h5>
      </div>
    </div>
   </div>

   <div class="card card-info">
      <div class="voutcher-divider">
        <div class="card-info-left text-center border-left">
        </div>

        <div class="card-info-right text-left">
          <span class="card-info-label">R$ Pavimentado</span> 
          <h5 class="card-info-valor">${formatCurrency(
            valorKmPavimentado,
            5
          )}</h5>
        </div>
      </div>
    </div>

    <div class="card card-info">
    <div class="voutcher-divider">
      <div class="card-info-left text-center border-left">
      </div>

      <div class="card-info-right text-left">
        <span class="card-info-label">R$ Não Pavimentado</span> 
        <h5 class="card-info-valor">${formatCurrency(
          valorKmNaoPavimentado,
          5
        )}</h5>
      </div>
    </div>
  </div>

  <div class="card card-info">
    <div class="voutcher-divider">
      <div class="card-info-left text-center border-left">
      </div>

      <div class="card-info-right text-left">
        <span class="card-info-label">Valor Fixo</span> 
        <h5 class="card-info-valor">${formatCurrency(valorFixo, 2)}</h5>
      </div>
    </div>
  </div>

  </div>
    
  </div>


`;


    //add dias calc de dias rodados
    for (let i = 1; i < 23; i++) {
      baseStringHtml +=
        '<div class="row centro_centro ">' +
        '<div class="card voutchers col-12 fade-in">' +
        '<div class="voutcher-divider">' +
        '<div class="voutcher-left text-center">' +
        '<h5 class="quant-dia-rodado">' +
        i +
        "</h5>" +
        '<span class="off">' +
        (i > 1 ? "Dias Rodados" : "Dia Rodado") +
        "</span>" +
        "</div>" +
        '<div class="voutcher-right text-center">' +
        '<span class="voutcher-name">Valor a Receber</span>' +
        '<h5 class="valor-receber">' +
        formatCurrency(
          valorFixo +
            i *
              (kmPavimentado * valorKmPavimentado +
                kmNaoPavimentado * valorKmNaoPavimentado),
          2
        ) +
        "</h5>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    }

  

    return baseStringHtml;
  }
};

function alterarNomeCollapse(){
  let button = document.getElementById('btn-detalhes');
  let collapse = document.getElementById('collapseDetalhesRota');

  if (collapse.classList.contains('show')) {
      button.textContent = 'Mostrar Detalhes';
  } else 
      button.textContent = 'Ocultar Detalhes';
  
}
function formatCurrency(valor, casasDecimais) {
  const formattedValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: casasDecimais,
  }).format(valor);
  return formattedValue;
}
