const fs = require("fs");
const path = require("path");
const readline = require("readline");
const crypto = require("crypto");
const caminhoArquivo = path.join(__dirname, "dados", "estoque.json");
const arquivo = fs.readFileSync(caminhoArquivo, "utf8");
const dados = JSON.parse(arquivo);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\nProdutos disponíveis:");

dados.estoque.forEach(produto => {
    console.log(
        `${produto.codigoProduto} - ${produto.descricaoProduto} - Estoque: ${produto.estoque}`
    );
});

rl.question("\nDigite o código do produto: ", codigo => {
    const produto = dados.estoque.find(
        item => item.codigoProduto === Number(codigo)
    );

    if (!produto) {
        console.log("Produto não encontrado.");
        rl.close();
        return;
    }

    rl.question("Digite o tipo da movimentação (ENTRADA ou SAIDA): ", tipo => {
        tipo = tipo.toUpperCase();

        if (tipo !== "ENTRADA" && tipo !== "SAIDA") {
            console.log("Tipo de movimentação inválido.");
            rl.close();
            return;
        }

        rl.question("Digite a quantidade: ", quantidade => {
            quantidade = Number(quantidade);

            if (!Number.isInteger(quantidade) || quantidade <= 0) {
                console.log("A quantidade deve ser um número inteiro maior que zero.");
                rl.close();
                return;
            }

            if (tipo === "SAIDA" && quantidade > produto.estoque) {
                console.log("Estoque insuficiente para realizar a saída.");
                rl.close();
                return;
            }

            rl.question("Digite uma descrição para a movimentação: ", descricao => {
                const estoqueAnterior = produto.estoque;

                if (tipo === "ENTRADA") {
                    produto.estoque += quantidade;
                } else {
                    produto.estoque -= quantidade;
                }

                const movimentacao = {
                    id: crypto.randomUUID(),
                    codigoProduto: produto.codigoProduto,
                    produto: produto.descricaoProduto,
                    tipo: tipo,
                    descricao: descricao,
                    quantidade: quantidade,
                    estoqueAnterior: estoqueAnterior,
                    estoqueFinal: produto.estoque
                };

                console.log("\nMovimentação realizada com sucesso!");
                console.log("-----------------------------------");
                console.log("ID:", movimentacao.id);
                console.log("Produto:", movimentacao.produto);
                console.log("Tipo:", movimentacao.tipo);
                console.log("Descrição:", movimentacao.descricao);
                console.log("Quantidade:", movimentacao.quantidade);
                console.log("Estoque anterior:", movimentacao.estoqueAnterior);
                console.log("Estoque final:", movimentacao.estoqueFinal);

                rl.close();
            });
        });
    });
});