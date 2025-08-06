let listaTarefas = [];
let filtroAtivo = 'Total';

document.addEventListener("DOMContentLoaded", () => {
  atualizarListaDeTarefas();
});

function adicionarTarefa() {
  const inputTarefa = document.getElementById("entradaTarefa");
  const textoTarefa = inputTarefa.value.trim();

  if (textoTarefa === "") {
    alert("Digite uma tarefa!");
    return;
  }

  listaTarefas.push({
    textoTarefa: textoTarefa,
    concluida: false
  });

  inputTarefa.value = "";
  atualizarListaDeTarefas();
}

function atualizarListaDeTarefas() {
  const listaElemento = document.getElementById("listaTarefas");
  listaElemento.innerHTML = "";

  listaTarefas
    .filter(tarefa => {
      if (filtroAtivo === 'Total') return true;
      if (filtroAtivo === 'pendentes') return !tarefa.concluida;
      if (filtroAtivo === 'concluidas') return tarefa.concluida;
    })
    .forEach((tarefa, indice) => {
      const itemLista = document.createElement("li");
      itemLista.className = "list-group-item d-flex justify-content-between align-items-center fade-in";

      const divEsquerda = document.createElement("div");
      divEsquerda.className = "d-flex align-items-center";

      // Removido o checkbox
      const textoElemento = document.createElement("span");
      textoElemento.textContent = tarefa.textoTarefa;
      if (tarefa.concluida) textoElemento.classList.add("concluida");

      divEsquerda.appendChild(textoElemento);

      const divBotoes = document.createElement("div");

      const btnEditarTarefa = document.createElement("button");
      btnEditarTarefa.textContent = "Editar";
      btnEditarTarefa.className = "btn btn-warning btn-sm me-2";
      btnEditarTarefa.onclick = () => editarTarefa(indice);

      const btnRemoverTarefa = document.createElement("button");
      btnRemoverTarefa.textContent = "Remover";
      btnRemoverTarefa.className = "btn btn-danger btn-sm";
      btnRemoverTarefa.onclick = () => removerTarefa(indice, itemLista);

      if (tarefa.concluida) {
        btnEditarTarefa.disabled = true;
        btnEditarTarefa.classList.add("btn-secondary");
        btnEditarTarefa.classList.remove("btn-warning");

        btnRemoverTarefa.disabled = true;
        btnRemoverTarefa.classList.add("btn-secondary");
        btnRemoverTarefa.classList.remove("btn-danger");
      }

      divBotoes.appendChild(btnEditarTarefa);
      divBotoes.appendChild(btnRemoverTarefa);

      itemLista.appendChild(divEsquerda);
      itemLista.appendChild(divBotoes);

      listaElemento.appendChild(itemLista);
    });

  document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filtros .btn[onclick*="${filtroAtivo}"]`)?.classList.add('active');
}

function editarTarefa(indice) {
  const novoTexto = prompt("Edite a tarefa:", listaTarefas[indice].textoTarefa);
  if (novoTexto && novoTexto.trim() !== "") {
    listaTarefas[indice].textoTarefa = novoTexto.trim();
    atualizarListaDeTarefas();
  }
}

function removerTarefa(indice, elemento) {
  elemento.classList.add("fade-out");
  setTimeout(() => {
    listaTarefas.splice(indice, 1);
    atualizarListaDeTarefas();
  }, 300);
}