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