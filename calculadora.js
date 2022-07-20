function juros(valorInicial, rendimentoMensal, nMeses, investimentoMensal){
    var totalMesM = valorInicial
    var rendimentoMesM = 0.0
    var juros = 0.0

    for(var i = 0; i < nMeses; i++){
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

/*var juros = juros(10000.00, 1/100, 10, 1000.00)
var imposto = imposto(juros, 10*30)
var total = valorTotal(10000.00 + (10*1000.00), juros, imposto)


alert("Juros: " + juros)
alert("Imposto: " + imposto)
alert("Total:" + total)*/