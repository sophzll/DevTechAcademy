# DevTech Academy - Gerenciamento de Alunos

Projeto desenvolvido para o estudo de caso de gerenciamento de alunos da escola DevTech Academy.

## Requisitos atendidos

### Exercício 1 - CRUD
- Cadastro de alunos.
- Listagem em tabela.
- Edição de registros.
- Exclusão de registros.
- Armazenamento em array de objetos na memória.

### Exercício 2 - Classe
- Classe `Aluno`.
- Atributos: `nome`, `idade`, `curso` e `notaFinal`.
- Construtor.
- Método `isAprovado()`.
- Método `toString()`.

### Exercício 3 - Eventos e funções
- Uso de `addEventListener`.
- Funções anônimas nos eventos dos botões.
- Arrow functions nas operações com arrays.
- Mensagens ao cadastrar, editar e excluir.

### Exercício 4 - Relatórios
- Alunos aprovados com `filter`.
- Médias com `reduce`.
- Nomes em ordem alfabética com `map` e `sort`.
- Quantidade por curso com `reduce` e `forEach`.

## Executar sem Docker

Abra o arquivo `index.html` no navegador.

## Executar com Docker

Na pasta do projeto, execute:

```bash
docker compose up --build
```

Depois, acesse:

http://localhost:8080

Para parar o container:

```bash
docker compose down
```

## Observação

Os alunos ficam armazenados em memória no array `alunos`. Portanto, os dados são perdidos quando a página é recarregada. Isso atende ao requisito do exercício, que pede armazenamento em memória.
