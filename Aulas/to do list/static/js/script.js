// Espera até que a página esteja completamente carregada antes de rodar qualquer coisa
document.addEventListener("DOMContentLoaded", () => {

    // Pega do HTML três coisinhas:
    // 1. O campo onde o usuário digita a tarefa
    const entradaTarefa = document.getElementById("entradaTarefa");

    // 2. O botão que a pessoa clica para adicionar a tarefa
    const botaoAdicionar = document.getElementById("btnAdicionar");

    // 3. A área onde a lista de tarefas vai aparecer
    const listaTarefas = document.getElementById("listaTarefas");

    // Aqui criamos uma lista VAZIA que vai guardar as tarefas adicionadas
    const tarefas = [];

    // Função que mostra (renderiza) todas as tarefas na tela
    const renderizarTarefas = () => {
        listaTarefas.innerHTML = ""; // Apaga tudo o que estiver na lista antes

        // Para cada tarefa da lista...
        tarefas.forEach((tarefa, indice) => {
            // Cria um novo item de lista (<li>)
            const li = document.createElement("li");
            li.className = `list-group-item`; // Adiciona uma classe de estilo

            // Coloca dentro do <li> o nome da tarefa e um botão para remover
            li.innerHTML = `
                <span>${tarefa.nome}</span>
                <div>
                    <button class="btn btn-sm btn-danger botao-remover" data-indice="${indice}">Remover</button>
                </div>
            `;

            // Coloca o <li> na lista de tarefas
            listaTarefas.appendChild(li);
        });

        // Agora que os botões "Remover" apareceram, vamos dizer o que acontece quando eles forem clicados
        document.querySelectorAll(".botao-remover").forEach((botao) => {
            // Quando clicar no botão, remove a tarefa correspondente
            botao.addEventListener("click", () => removerTarefa(botao.dataset.indice));
        });
    };

    // Função que remove uma tarefa da lista
    const removerTarefa = (indice) => {
        tarefas.splice(indice, 1); // Remove 1 item da lista, no lugar indicado
        renderizarTarefas(); // Atualiza a tela para refletir a mudança
    };

    // Quando o botão de adicionar for clicado...
    botaoAdicionar.addEventListener("click", () => {
        // Pega o texto que a pessoa digitou, tirando espaços extras
        const nomeTarefa = entradaTarefa.value.trim();

        // Se a pessoa digitou alguma coisa...
        if (nomeTarefa) {
            // Adiciona a tarefa na lista
            tarefas.push({ nome: nomeTarefa });

            // Limpa o campo de digitar e coloca o foco nele de novo
            entradaTarefa.value = "";
            entradaTarefa.focus();

            // Atualiza a tela para mostrar a nova tarefa
            renderizarTarefas();
        } else {
            // Se o campo estiver vazio, mostra um alerta
            alert("Por favor, digite uma tarefa!");
        }
    });
});