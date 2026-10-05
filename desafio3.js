const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function converterData(dataTexto) {
    const partes = dataTexto.split("/");
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);
    return new Date(ano, mes - 1, dia);
}

function calcularJuros(valor, dataVencimento) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataVencimento.setHours(0, 0, 0, 0);

    if (dataVencimento >= hoje) {
        return {
            diasAtraso: 0,
            juros: 0,
            valorTotal: valor
        };
    }

    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenca = hoje - dataVencimento;
    const diasAtraso = Math.floor(
        diferenca / milissegundosPorDia
    );

    const taxaJuros = 0.025;
    const juros = valor * taxaJuros * diasAtraso;
    const valorTotal = valor + juros;

    return {
        diasAtraso,
        juros,
        valorTotal
    };
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"});
}

rl.question("Digite o valor: R$ ", valorDigitado => {
    const valor = Number(valorDigitado.replace(",", "."));

    if (isNaN(valor) || valor <= 0) {
        console.log("Valor inválido.");
        rl.close();
        return;
    }

    rl.question("Digite a data de vencimento (DD/MM/AAAA): ", dataDigitada => {
        const dataVencimento = converterData(dataDigitada);

        if (isNaN(dataVencimento.getTime())) {
            console.log("Data inválida.");
            rl.close();
            return;
        }

        const resultado = calcularJuros(valor, dataVencimento);

        console.log("\nResultado do cálculo:");
        console.log("---------------------");
        console.log("Valor original:", formatarMoeda(valor));
        console.log("Dias em atraso:", resultado.diasAtraso);
        console.log("Juros:", formatarMoeda(resultado.juros));
        console.log("Valor total:", formatarMoeda(resultado.valorTotal));

        rl.close();
    });
});