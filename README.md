# Desafio Técnico - Desenvolvedor Júnior

Este projeto contém a resolução de três desafios utilizando JavaScript e Node.js.

## Requisitos

- Node.js instalado

Não é necessário instalar nenhuma dependência externa.

## Estrutura

- `desafio1.js` - Cálculo de comissão dos vendedores
- `desafio2.js` - Movimentação de estoque
- `desafio3.js` - Cálculo de juros por atraso
- `dados/vendas.json` - Dados utilizados no desafio 1
- `dados/estoque.json` - Dados utilizados no desafio 2

## Desafio 1 - Comissão de vendedores

O programa lê os dados das vendas e calcula a comissão total de cada vendedor.

Regras:

- Vendas abaixo de R$ 100,00: sem comissão
- Vendas de R$ 100,00 até R$ 499,99: 1% de comissão
- Vendas a partir de R$ 500,00: 5% de comissão

Para executar: `node desafio1.js`

## Desafio 2 - Movimentação de estoque

O programa permite realizar movimentações de entrada e saída dos produtos disponíveis no estoque.

A movimentação possui um identificador único, descrição, quantidade movimentada e informa o estoque final do produto.

Para executar: `node desafio2.js`

## Desafio 3 - Cálculo de juros

O programa recebe um valor e uma data de vencimento e calcula os juros até a data atual, considerando uma taxa de 2,5% ao dia.

Para executar: `node desafio3.js`