// let listaTarefas = [];
// let filtroAtivo = 'Total';

// document.addEventListener("DOMContentLoaded", () => {
//   atualizarListaDeTarefas();
// });

// function adicionarTarefa() {
//   const inputTarefa = document.getElementById("entradaTarefa");
//   const textoTarefa = inputTarefa.value.trim();

//   if (textoTarefa === "") {
//     alert("Digite uma tarefa!");
//     return;
//   }

//   listaTarefas.push({
//     textoTarefa: textoTarefa,
//     concluida: false
//   });

//   inputTarefa.value = "";
//   atualizarListaDeTarefas();
// }

// function atualizarListaDeTarefas() {
//   const listaElemento = document.getElementById("listaTarefas");
//   listaElemento.innerHTML = "";

//   listaTarefas
//     .filter(tarefa => {
//       if (filtroAtivo === 'Total') return true;
//       if (filtroAtivo === 'pendentes') return !tarefa.concluida;
//       if (filtroAtivo === 'concluidas') return tarefa.concluida;
//     })
//     .forEach((tarefa, index) => {
//       const itemLista = document.createElement("li");
//       itemLista.className = "list-group-item d-flex justify-content-between align-items-center fade-in";

//       const divEsquerda = document.createElement("div");
//       divEsquerda.className = "d-flex align-items-center";

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.className = "form-check-input me-2";
//       checkbox.checked = tarefa.concluida;
//       checkbox.addEventListener("change", () => {
//         tarefa.concluida = checkbox.checked;
//         atualizarListaDeTarefas();
//       });

//       const textoElemento = document.createElement("span");
//       textoElemento.textContent = tarefa.textoTarefa;
//       if (tarefa.concluida) textoElemento.classList.add("concluida");

//       divEsquerda.appendChild(checkbox);
//       divEsquerda.appendChild(textoElemento);

//       const divBotoes = document.createElement("div");

  

//       const btnRemoverTarefa = document.createElement("button");
//       btnRemoverTarefa.textContent = "Remover";
//       btnRemoverTarefa.className = "btn btn-danger btn-sm";
//       btnRemoverTarefa.onclick = () => removerTarefa(index, itemLista);

//       if (tarefa.concluida) {
  
//         btnRemoverTarefa.disabled = true;
//         btnRemoverTarefa.classList.add("btn-secondary");
//         btnRemoverTarefa.classList.remove("btn-danger");
//       }


//       divBotoes.appendChild(btnRemoverTarefa);

//       itemLista.appendChild(divEsquerda);
//       itemLista.appendChild(divBotoes);

//       listaElemento.appendChild(itemLista);
//     });

//   document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
//   document.querySelector(`.filtros .btn[onclick*="${filtroAtivo}"]`)?.classList.add('active');
// }


// function removerTarefa(index, elemento) {
//   elemento.classList.add("fade-out");
//   setTimeout(() => {
//     listaTarefas.splice(index, 1);
//     atualizarListaDeTarefas();
//   }, 300);
// }