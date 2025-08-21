// Variavel para as minhas tarefas que serão alocadas em um vetor
let tarefas = [];
// criação de um filtro 
  let filtroAtual = 'todas';

//   essa função vai armazenar o json no local storage
  function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // essa função vai deixar o json no local storage em uma variável constante, após essa ação a lista chama a função para atualizar a lista atual
  function carregarTarefas() {
    const armazenadas = localStorage.getItem('tarefas');
    if (armazenadas) tarefas = JSON.parse(armazenadas);
    atualizarLista();
  }

//   função criada onde irá receber o conteudo da lista, com essa função ela vai alocar o conteudo que eu por na lista. ao final da função a lista é salva e atualizada 
  function adicionarTarefa() {
    const entrada = document.getElementById('entradaTarefa');
    const texto = entrada.value.trim();
    if (!texto) return;
    tarefas.push({ texto, concluida: false });
    salvarTarefas();
    atualizarLista();
    entrada.value = '';
    entrada.focus();
  }

//   essa função vai fazer com que seja 
  function exibirTarefa(tarefa, indice) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center fade-in';
    li.setAttribute('data-id', indice);
    if (tarefa.concluida) {
      li.classList.add('concluida2')
    }

    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    span.style.cursor = 'pointer';
    if (tarefa.concluida) span.classList.add('concluida');

    // quando é clicado o span o booleano se inverte, antes estava pendente agora está concluida e vice e versa
    span.onclick = () => {
      tarefas[indice].concluida = !tarefas[indice].concluida;
      salvarTarefas();
      atualizarLista();
    };

    span.ondblclick = () => {
      const input = document.createElement('input');
      input.className = 'editando';
      input.value = tarefa.texto;

      input.onblur = () => {
        const novoTexto = input.value.trim();
        if (novoTexto !== '') {
          tarefas[indice].texto = novoTexto;
          salvarTarefas();
          atualizarLista();
        }
      };

      input.onkeypress = (e) => {
        if (e.key === 'Enter') input.blur();
      };

      li.replaceChild(input, span);
      input.focus();
    };

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'btn btn-danger btn-sm';
    botaoRemover.textContent = 'Remover';
    botaoRemover.onclick = () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        tarefas.splice(indice, 1);
        salvarTarefas();
        atualizarLista();
      }, 300);
    };

    li.appendChild(span);
    li.appendChild(botaoRemover);
    document.getElementById('listaTarefas').appendChild(li);
  }

  function atualizarLista() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filtros .btn[onclick*="${filtroAtual}"]`).classList.add('active');

    tarefas.forEach((tarefa, indice) => {
      const mostrar =
        filtroAtual === 'todas' ||
        (filtroAtual === 'pendentes' && !tarefa.concluida) ||
        (filtroAtual === 'concluidas' && tarefa.concluida);
      if (mostrar) exibirTarefa(tarefa, indice);
    });

    // Reativar drag and drop após renderização
    Sortable.create(lista, {
      animation: 150,
      onEnd: function (evt) {
        const [moved] = tarefas.splice(evt.oldIndex, 1);
        tarefas.splice(evt.newIndex, 0, moved);
        salvarTarefas();
        atualizarLista();
      }
    });
  }

  function limparConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    salvarTarefas();
    atualizarLista();
  }

  document.getElementById('entradaTarefa').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') adicionarTarefa();
  });

  window.onload = carregarTarefas;