function juros(valorInicial, rendimentoMensal, nMeses, investimentoMensal){
    let totalMesM = valorInicial
    let rendimentoMesM = 0.0
    let juros = 0.0

    for(let i = 0; i <= nMeses; i++){
        rendimentoMesM = totalMesM * rendimentoMensal
        juros += rendimentoMesM
        totalMesM += investimentoMensal + rendimentoMesM
    }

    return juros
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

function transforma(valor){
    valor = valor.replace(/\./g, "")
    valor = valor.replace(/\,/g,".")
    return valor
}

function calcular(){
    let valorInicial = document.getElementById("valorInicial").value
    valorInicial = transforma(valorInicial)
    valorInicial = parseFloat(valorInicial) 

    let rendimentoMensal = document.getElementById("rendimento").value
    rendimentoMensal = transforma(rendimentoMensal)
    rendimentoMensal = parseFloat(rendimentoMensal)

    let nMeses = document.getElementById("nMeses").value
    nMeses = parseInt(nMeses)
    
    let investimentoMensal = document.getElementById("valorMensal").value
    investimentoMensal = transforma(investimentoMensal)
    investimentoMensal = parseFloat(investimentoMensal)

    let jurosTotais = juros(valorInicial, rendimentoMensal/100, nMeses, investimentoMensal)
    let impostoTotal = imposto(jurosTotais, nMeses*30)
    let total = valorTotal(valorInicial + (nMeses*investimentoMensal), jurosTotais, impostoTotal)

    alert("Juros: " + jurosTotais)
    alert("Imposto: " + impostoTotal)
    alert("Total: " + total)
}

