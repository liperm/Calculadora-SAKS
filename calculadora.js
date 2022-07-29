//Calculo dos juros totais do investimento. Recebe o rendimento em %
function juros(valorInicial, rendimentoMensal, nMeses, investimentoMensal){
    let totalMesM = valorInicial
    let rendimentoMesM = 0.0
    let juros = 0.0
    let dados = [['Tempo', 'Total Investido', 'Total com Juros']]//Matriz referente aos dados de entrada do gŕafico

    for(let i = 0; i <= nMeses; i++){
        rendimentoMesM = totalMesM * rendimentoMensal
        juros += rendimentoMesM
        totalMesM += investimentoMensal + rendimentoMesM
        dados.push([i, valorInicial + i * investimentoMensal, totalMesM - investimentoMensal])//Salva os dados calculados na matriz
    }

    //Objeto de retorno
    let investimento = {
        jurosTotais : juros,//Juros totais do investimento
        historico : dados}//Matriz utilizada no grafico

    return investimento
}

//Calculo do imposto de renda. Recebe o valor em dias
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

//valor total + rendimento - IR
function valorTotal(valorTotalInvestido, rendimentoTotal, impostoDeRenda){
    return (valorTotalInvestido + rendimentoTotal - impostoDeRenda)
}

//Função que formata o valor nos inputs, deixando-os no formato de moeda
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

//Recebe uma string no formato de moeda e a transforma para float
function deMoedaParaFloat(valor){
    valor = valor.replace("R$", "")
    valor = valor.replace(/\./g, "")
    valor = valor.replace(/\,/g,".")
    return parseFloat(valor)
}

//Recebe um valor em float e retorna uma string no formato de moeda (com máscara R$)
var deFloatParaMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  //Função de montagem do gŕafico
function desenhaGrafico(dados) {
    console.log(dados)
    var data = google.visualization.arrayToDataTable(dados, false);//Recebe matriz contendo os dados de ano, valor investido e valor investido + juros

    var options = {
      title: 'Rendimento ao longo dos meses',
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#A1C5FF', '#5274d8']
    };

    var chart = new google.visualization.LineChart(document.getElementById('grafico'));

    chart.draw(data, options);
}

function selectDropdown(valor){
    document.getElementById("dropdown").textContent = valor
}

//Função chamada pelo botão Calcular. Responsável pela chamada das demais funções
function calcular(){
    //Recebimento de valores dos inputs nas variáveis
    let valorInicial = document.getElementById("valorInicial").value
    let rendimentoMensal = document.getElementById("rendimento").value
    let nMeses = document.getElementById("nMeses").value
    let investimentoMensal = document.getElementById("valorMensal").value

    //Verificação de inputs vazios
    if(valorInicial.length > 0 && rendimentoMensal.length > 0 && (nMeses.length > 0 && parseInt(nMeses) > 0) && investimentoMensal.length > 0){
        document.getElementById("graficosep").style.display = "block"
        document.getElementById("graficodiv").style.display = "block"
        document.getElementById("grafico").style.display = "block"

        //Transformações dos inputs em valores numéricos para serem utilizados nos cálculos
        valorInicial = deMoedaParaFloat(valorInicial)
        rendimentoMensal = deMoedaParaFloat(rendimentoMensal)
        nMeses = parseInt(nMeses)
        investimentoMensal = deMoedaParaFloat(investimentoMensal)

        //Se for selecionado 'anos' em tempo de investimento, o valor é convertido em meses
        if(document.getElementById("dropdown").textContent === "Anos"){
            nMeses = nMeses * 12
        }

        let dadosInvestimento = juros(valorInicial, rendimentoMensal/100, nMeses, investimentoMensal)//Rendimento em %
        let jurosTotais = dadosInvestimento.jurosTotais 
        let impostoTotal = imposto(jurosTotais, nMeses*30)//Conversão de meses para dias
        let totalInvestido = valorInicial + (nMeses*investimentoMensal)
        let total = valorTotal(totalInvestido, jurosTotais, impostoTotal)
        
        //Transformação dos dados para exibição
        document.getElementById("totalInvestido").textContent = deFloatParaMoeda.format(totalInvestido)
        document.getElementById("totalJuros").textContent = deFloatParaMoeda.format(jurosTotais)
        document.getElementById("totalImposto").textContent = deFloatParaMoeda.format(impostoTotal)
        document.getElementById("total").textContent = deFloatParaMoeda.format(total)

        //Diminuição da fonte dos resultados em caso de resultado grande
        if(document.getElementById("totalInvestido").textContent.length > 13) {
            document.getElementById("totalInvestido").classList.remove("text-result")
            document.getElementById("totalInvestido").classList.add("text-result-mini")
        } else {
            document.getElementById("totalInvestido").classList.add("text-result")
            document.getElementById("totalInvestido").classList.remove("text-result-mini")
        }

        if(document.getElementById("totalJuros").textContent.length > 13) {
            document.getElementById("totalJuros").classList.remove("text-result")
            document.getElementById("totalJuros").classList.add("text-result-mini")
        } else {
            document.getElementById("totalJuros").classList.add("text-result")
            document.getElementById("totalJuros").classList.remove("text-result-mini")
        }

        if(document.getElementById("totalImposto").textContent.length > 13) {
            document.getElementById("totalImposto").classList.remove("text-result")
            document.getElementById("totalImposto").classList.add("text-result-mini")
        } else {
            document.getElementById("totalImposto").classList.add("text-result")
            document.getElementById("totalImposto").classList.remove("text-result-mini")
        }

        if(document.getElementById("total").textContent.length > 13) {
            document.getElementById("total").classList.remove("text-result")
            document.getElementById("total").classList.add("text-result-mini")
        } else {
            document.getElementById("total").classList.add("text-result")
            document.getElementById("total").classList.remove("text-result-mini")
        }

        //Transformação dos dados de entrada do gráfico para melhor apresesentação dos mesmos
        for(var i = 1; i <= nMeses + 1; i++){
            for(var j = 1; j < 3; j++){
                dadosInvestimento.historico[i][j] = deMoedaParaFloat(deFloatParaMoeda.format(dadosInvestimento.historico[i][j]))
            }
        }

        //Desenho do gráfico
        google.charts.load('current', {'packages':['corechart']})
        google.charts.setOnLoadCallback(function(){desenhaGrafico(dadosInvestimento.historico)})
    }
    else{
        limpar()
    }
}

//Limpa todos os inputs e outputs e reformata os campos de resultado
function limpar() {
    document.getElementById("totalInvestido").textContent = "R$ 0,00"
    document.getElementById("totalJuros").textContent = "R$ 0,00"
    document.getElementById("totalImposto").textContent = "R$ 0,00"
    document.getElementById("total").textContent = "R$ 0,00"

    document.getElementById("graficosep").style.display = "none"
    document.getElementById("graficodiv").style.display = "none"
    document.getElementById("grafico").style.display = "none"

    document.getElementById("totalInvestido").classList.remove("text-result-mini")
    document.getElementById("totalInvestido").classList.add("text-result")

    document.getElementById("totalJuros").classList.remove("text-result-mini")
    document.getElementById("totalJuros").classList.add("text-result")

    document.getElementById("totalImposto").classList.remove("text-result-mini")
    document.getElementById("totalImposto").classList.add("text-result")

    document.getElementById("total").classList.remove("text-result-mini")
    document.getElementById("total").classList.add("text-result")
}

//Permite que o cálculo seja realizado com o pressionamento da tecla 'Enter'
document.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        calcular();
    }
  });

$(window).resize(function(){
    calcular();
  });