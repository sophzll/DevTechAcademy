// EXERCÍCIO 2: classe Aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Retorna true quando a nota é maior ou igual a 7.
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Retorna os dados do aluno em formato de texto.
    toString() {
        return this.nome + " - " + this.idade + " anos - " +
            this.curso + " - Nota: " + this.notaFinal;
    }
}

// Array que armazena os objetos Aluno em memória.
let alunos = [];
let indiceEdicao = -1;

// Captura dos elementos HTML.
const formulario = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");

// EXERCÍCIO 1: cadastro e edição
function salvarAluno(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const curso = document.getElementById("curso").value;
    const notaFinal = Number(document.getElementById("notaFinal").value);

    if (nome === "" || idade <= 0 || notaFinal < 0 || notaFinal > 10) {
        mensagem.textContent = "Preencha os campos corretamente. A nota deve estar entre 0 e 10.";
        return;
    }

    const aluno = new Aluno(nome, idade, curso, notaFinal);

    if (indiceEdicao === -1) {
        alunos.push(aluno);
        mensagem.textContent = "Aluno cadastrado com sucesso!";
    } else {
        alunos[indiceEdicao] = aluno;
        mensagem.textContent = "Aluno editado com sucesso!";
        cancelarEdicao();
    }

    formulario.reset();
    listarAlunos();
}

// Renderiza novamente a tabela com os dados do array.
function listarAlunos() {
    tabela.innerHTML = "";

    // EXERCÍCIO 3: arrow function no forEach.
    alunos.forEach((aluno, indice) => {
        const linha = document.createElement("tr");

        const celulaNome = document.createElement("td");
        celulaNome.textContent = aluno.nome;
        linha.appendChild(celulaNome);

        const celulaIdade = document.createElement("td");
        celulaIdade.textContent = aluno.idade;
        linha.appendChild(celulaIdade);

        const celulaCurso = document.createElement("td");
        celulaCurso.textContent = aluno.curso;
        linha.appendChild(celulaCurso);

        const celulaNota = document.createElement("td");
        celulaNota.textContent = aluno.notaFinal;
        linha.appendChild(celulaNota);

        const celulaSituacao = document.createElement("td");
        celulaSituacao.textContent = aluno.isAprovado() ? "Aprovado" : "Reprovado";
        linha.appendChild(celulaSituacao);

        const celulaAcoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        // EXERCÍCIO 3: função anônima no evento de clique.
        botaoEditar.addEventListener("click", function () {
            editarAluno(indice);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        // EXERCÍCIO 3: função anônima no evento de clique.
        botaoExcluir.addEventListener("click", function () {
            excluirAluno(indice);
        });

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(document.createTextNode(" "));
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);
    });
}

function editarAluno(indice) {
    const aluno = alunos[indice];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;

    indiceEdicao = indice;
    botaoSalvar.textContent = "Salvar edição";
    botaoCancelar.hidden = false;
    mensagem.textContent = "Editando: " + aluno.nome;
}

function cancelarEdicao() {
    indiceEdicao = -1;
    formulario.reset();
    botaoSalvar.textContent = "Cadastrar";
    botaoCancelar.hidden = true;
}

function excluirAluno(indice) {
    const nome = alunos[indice].nome;
    alunos.splice(indice, 1);

    if (indiceEdicao === indice) {
        cancelarEdicao();
    } else if (indiceEdicao > indice) {
        indiceEdicao--;
    }

    listarAlunos();
    mensagem.textContent = "Aluno " + nome + " excluído com sucesso!";
}

// EXERCÍCIO 4: relatórios com métodos de array.

function mostrarAprovados() {
    // filter seleciona somente alunos com nota maior ou igual a 7.
    const aprovados = alunos.filter(aluno => aluno.notaFinal >= 7);

    resultadoRelatorio.innerHTML = "";
    const titulo = document.createElement("h5");
    titulo.textContent = "Alunos aprovados";
    resultadoRelatorio.appendChild(titulo);

    if (aprovados.length === 0) {
        resultadoRelatorio.appendChild(document.createTextNode("Nenhum aluno aprovado."));
        return;
    }

    // map transforma os objetos em textos.
    const nomes = aprovados.map(aluno => aluno.toString());

    // forEach percorre os resultados e cria uma linha para cada um.
    nomes.forEach(nome => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = nome;
        resultadoRelatorio.appendChild(paragrafo);
    });
}

function mostrarMediaNotas() {
    // reduce soma todas as notas.
    const soma = alunos.reduce((total, aluno) => total + aluno.notaFinal, 0);
    const media = alunos.length > 0 ? soma / alunos.length : 0;

    resultadoRelatorio.textContent = "Média das notas finais: " + media.toFixed(2);
}

function mostrarMediaIdades() {
    const soma = alunos.reduce((total, aluno) => total + aluno.idade, 0);
    const media = alunos.length > 0 ? soma / alunos.length : 0;

    resultadoRelatorio.textContent = "Média das idades: " + media.toFixed(2);
}

function mostrarOrdemAlfabetica() {
    // map pega os nomes; sort organiza em ordem alfabética.
    const nomes = alunos
        .map(aluno => aluno.nome)
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    resultadoRelatorio.innerHTML = "";
    const titulo = document.createElement("h5");
    titulo.textContent = "Alunos em ordem alfabética";
    resultadoRelatorio.appendChild(titulo);

    nomes.forEach(nome => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = nome;
        resultadoRelatorio.appendChild(paragrafo);
    });

    if (nomes.length === 0) {
        resultadoRelatorio.appendChild(document.createTextNode("Nenhum aluno cadastrado."));
    }
}

function mostrarQuantidadeCursos() {
    // reduce conta quantos alunos existem em cada curso.
    const quantidades = alunos.reduce((contador, aluno) => {
        contador[aluno.curso] = (contador[aluno.curso] || 0) + 1;
        return contador;
    }, {});

    resultadoRelatorio.innerHTML = "";
    const titulo = document.createElement("h5");
    titulo.textContent = "Quantidade de alunos por curso";
    resultadoRelatorio.appendChild(titulo);

    ["JavaScript", "Python", "Java"].forEach(curso => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = curso + ": " + (quantidades[curso] || 0) + " aluno(s)";
        resultadoRelatorio.appendChild(paragrafo);
    });
}

function mostrarTodos() {
    resultadoRelatorio.textContent = "Total de alunos cadastrados: " + alunos.length;
}

// EXERCÍCIO 3: eventos com addEventListener.
// O formulário utiliza uma função já declarada.
formulario.addEventListener("submit", salvarAluno);

// Funções anônimas nos eventos dos botões.
botaoCancelar.addEventListener("click", function () {
    cancelarEdicao();
    mensagem.textContent = "Edição cancelada.";
});

document.getElementById("btnAprovados").addEventListener("click", function () {
    mostrarAprovados();
});

document.getElementById("btnMediaNotas").addEventListener("click", function () {
    mostrarMediaNotas();
});

document.getElementById("btnMediaIdades").addEventListener("click", function () {
    mostrarMediaIdades();
});

document.getElementById("btnOrdemAlfabetica").addEventListener("click", function () {
    mostrarOrdemAlfabetica();
});

document.getElementById("btnQuantidadeCursos").addEventListener("click", function () {
    mostrarQuantidadeCursos();
});

document.getElementById("btnTodos").addEventListener("click", function () {
    mostrarTodos();
});

// Exibe a tabela vazia quando a página é carregada.
listarAlunos();
