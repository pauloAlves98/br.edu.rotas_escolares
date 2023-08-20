window.onload = function() {
    preencherRotas();
}

function capturarValores() {
    var valorFixo = parseFloat(document.getElementById("valorFixo").value.replace(/[R$\s.]/g, "").replace(",", ".")); //converte para float!
    var kmPavimentado = document.getElementById("kmPavimentado").value;
    var valorKmPavimentado = document.getElementById("valorKmPavimentado").value;
    var kmNaoPavimentado = document.getElementById("kmNaoPavimentado").value;
    var valorKmNaoPavimentado = document.getElementById("valorKmNaoPavimentado").value;
    
    console.log("Valor Fixo:", valorFixo);
    console.log("KM Pavimentado:", kmPavimentado);
    console.log("Valor KM Pavimentado:", valorKmPavimentado);
    console.log("KM Não Pavimentado:", kmNaoPavimentado);
    console.log("Valor KM Não Pavimentado:", valorKmNaoPavimentado);
}

//Preenchimento de rotas
function preencherRotas(){
    const rotaSelect = document.getElementById('rotas');
    // Preencha as opções com valores de ROTA 1 a ROTA 33
    for (let i = 1; i <= 33; i++) {
      const rota = 'ROTA ' + i;
      const option = new Option(rota, rota);
      rotaSelect.appendChild(option);
    }
}

//FAZER METODO
const rotaInput = document.getElementById('rota');
const loadingIndicator = document.getElementById('loadingIndicator');
// Adicione um evento de mudança à opção selecionada

rotaInput.addEventListener('change', function() {
  rotaInput.disabled = true;
  const selectedRota = this.value;
  console.log('Rota selecionada: ' + selectedRota);
  loadingIndicator.style.display = 'flex';

   setTimeout(() => {
    // Esconda o indicador de loading após o atraso (simulando o carregamento de dados)
    loadingIndicator.style.display = 'none';
    rotaInput.disabled = false;
  }, 500); 

})



// Atualize o componente Selectpicker após adicionar as opções
// const realInputs = document.querySelectorAll(".real-input");
// realInputs.forEach((input) => {
//   input.addEventListener("input", formatCurrency);
// });

// function formatCurrency(event) {
//   const input = event.target;
//   const value = input.value.replace(/\D/g, ""); // Remove non-digit characters
//   const formattedValue = Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value / 100);
//   input.value = formattedValue;
// }