const fs = require("fs");
const path = require("path");
const caminhoarquivo = path.join(__dirname, "dados", "vendas.json");
const arquivo = fs.readFileSync(caminhoarquivo, "utf8");
const dados = JSON.parse(arquivo);

function calcularComissao(valor) {
    if (valor < 100) {
        return 0;
    }

    if (valor < 500) {
        return valor * 0.01;
    }

    return valor * 0.05;
}

const comissoesPorVendedor = {};
dados.vendas.forEach(venda => {
    const comissao = calcularComissao(venda.valor);
    if (!comissoesPorVendedor[venda.vendedor]) {
        comissoesPorVendedor[venda.vendedor] = 0;
    }
    comissoesPorVendedor[venda.vendedor] += comissao;
});

console.log("Comissões por vendedor:");
for (const vendedor in comissoesPorVendedor) {
    const comissaoFormatada = comissoesPorVendedor[vendedor].toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
    console.log(`${vendedor}: ${comissaoFormatada}`);
}