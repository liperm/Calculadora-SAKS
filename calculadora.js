function juros(valorInicial, rendimentoMensal, nMeses, investimentoMensal){
    let totalMesM = valorInicial
    let rendimentoMesM = 0.0
    let juros = 0.0
    let dados = [['Tempo', 'Total Investido', 'Total com Juros']]

    for(let i = 0; i <= nMeses; i++){
        rendimentoMesM = totalMesM * rendimentoMensal
        juros += rendimentoMesM
        totalMesM += investimentoMensal + rendimentoMesM
        dados.push([i, valorInicial + i * investimentoMensal, totalMesM - investimentoMensal])
    }

    let investimento = {
        jurosTotais : juros,
        historico : dados}

    return investimento
}

function imposto(rendimentoTotal, nDias){
    if(nDias <= 180){
        return (rendimentoTotal * (22.5/100))
    }
    else if(nDias <= 360){
        return (rendimentoTotal * (20/100))  
    }
    else if(nDias <= 720){
        return (rendimentoTotal * (17.5/100))
        
    }
    else{
        return (rendimentoTotal * (15/100))
        
    }
}

function valorTotal(valorTotalInvestido, rendimentoTotal, impostoDeRenda){
    return (valorTotalInvestido + rendimentoTotal - impostoDeRenda)
}

 function formatarMoeda(input) {
    let elemento = input;
    let valor = elemento.value;
    

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';
    
}

function deMoedaParaFloat(valor){
    valor = valor.replace("R$", "")
    valor = valor.replace(/\./g, "")
    valor = valor.replace(/\,/g,".")
    return parseFloat(valor)
}

var deFloatParaMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

function desenhaGrafico(dados) {
    console.log(dados)
    var data = google.visualization.arrayToDataTable(dados, false);

    var options = {
      title: 'Investimento',
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#A1C5FF', '#5274d8']
    };

    var chart = new google.visualization.LineChart(document.getElementById('grafico'));

    chart.draw(data, options);
}

function calcular(){
    document.getElementById("graficosep").style.display = "block"
    document.getElementById("graficodiv").style.display = "block"
    document.getElementById("grafico").style.display = "block"

    let valorInicial = document.getElementById("valorInicial").value
    valorInicial = deMoedaParaFloat(valorInicial)

    let rendimentoMensal = document.getElementById("rendimento").value
    rendimentoMensal = deMoedaParaFloat(rendimentoMensal)

    let nMeses = document.getElementById("nMeses").value
    nMeses = parseInt(nMeses)
    
    let investimentoMensal = document.getElementById("valorMensal").value
    investimentoMensal = deMoedaParaFloat(investimentoMensal)

    let dadosInvestimento = juros(valorInicial, rendimentoMensal/100, nMeses, investimentoMensal)
    let jurosTotais = dadosInvestimento.jurosTotais 
    let impostoTotal = imposto(jurosTotais, nMeses*30)
    let totalInvestido = valorInicial + (nMeses*investimentoMensal)
    let total = valorTotal(totalInvestido, jurosTotais, impostoTotal)
    
    document.getElementById("totalInvestido").textContent = deFloatParaMoeda.format(totalInvestido)
    document.getElementById("totalJuros").textContent = deFloatParaMoeda.format(jurosTotais)
    document.getElementById("totalImposto").textContent = deFloatParaMoeda.format(impostoTotal)
    document.getElementById("total").textContent = deFloatParaMoeda.format(total)

    for(var i = 1; i <= nMeses + 1; i++){
        for(var j = 1; j < 3; j++){
            dadosInvestimento.historico[i][j] = deMoedaParaFloat(deFloatParaMoeda.format(dadosInvestimento.historico[i][j]))
        }
    }

    google.charts.load('current', {'packages':['corechart']})
    google.charts.setOnLoadCallback(function(){desenhaGrafico(dadosInvestimento.historico)})
}

function limpar() {
    document.getElementById("totalInvestido").textContent = "R$ 0,00"
    document.getElementById("totalJuros").textContent = "R$ 0,00"
    document.getElementById("totalImposto").textContent = "R$ 0,00"
    document.getElementById("total").textContent = "R$ 0,00"

    document.getElementById("graficosep").style.display = "none"
    document.getElementById("graficodiv").style.display = "none"
    document.getElementById("grafico").style.display = "none"
}

document.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        calcular();
    }
  });

$(window).resize(function(){
    calcular();
  });