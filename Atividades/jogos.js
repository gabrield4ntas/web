let clubes = [];

const inClube = document.getElementById("inClube");
const outLista = document.getElementById("outLista");
const btAdicionar = document.getElementById("btAdicionar");
const btListar = document.getElementById("btListar");
const btMontar = document.getElementById("btMontar");

function adicionarClube() {
    const nome = inClube.value.trim();

    if(!nome) {
        alert("Informe o nome do clube");
        inClube.focus();
        return;
    }
        clubes.push(nome);
        inClube.value = "";
        inClube.focus();
    }

function listarClubes(){
    if(clubes.length === 0){
        outLista.textContent = "Não há clubes na lista";
        return;
    }

    outLista.textContent = clubes
        .map((clube, i) => `${i + 1}. ${clube}`)
        .join("\n");       
}

function montarJogos(){
    const tam = clubes.length;
    if (tam == 0 || tam % 2 !== 0) {
        alert("A lista deve conter um número par de clubes");
        inClube.focus();
        return;
    }

    const jogos = clubes
    .slice(0, tam/2)
    .map((clube, i) => `${clube} x ${clubes[tam - 1 - i]}`)
    .join("\n");
    outLista.textContent = jogos;
}

btAdicionar.addEventListener("click", adicionarClube);
btListar.addEventListener("click", listarClubes);
btMontar.addEventListener("click", montarJogos);