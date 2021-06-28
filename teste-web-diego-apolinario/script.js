class Viagem {
  constructor(origem, destino, dataIda, dataVolta) {
    this.origem = origem;
    this.destino = destino;
    this.dataIda = dataIda;
    this.dataVolta = dataVolta;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");
    //criar o id
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(v) {
    let id = this.getProximoId();
    //convertendo em string e atualizando o id
    localStorage.setItem(id, JSON.stringify(v));
    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    let viagens = Array();

    let id = localStorage.getItem("id");
    //recuperar todas as viagens cadastradas no localstorage
    for (let i = 1; i <= id; i++) {
      //recuperando a viagem
      let viagem = JSON.parse(localStorage.getItem(i));

      //verificando se alguma key foi removida
      if (viagem === null) {
        continue;
      }
      //adicionando o valor id no array
      viagem.id = i;

      viagens.push(viagem);
    }
    return viagens;
  }
  remover(id) {
    localStorage.removeItem(id);
  }
}

let bd = new Bd();

function cadastrarViagem() {
  let origem = $("#origem").val();
  let destino = $("#destino").val();
  let dataIda = $("#dataIda").val();
  let dataVolta = $("#dataVolta").val();

  let viagem = new Viagem(origem, destino, dataIda, dataVolta);

  if (viagem.validarDados()) {
    bd.gravar(viagem);
    alert("Reserva de voo concluída!");
    //limpar inputs
    origem.value = "";
    destino.value = "";
    dataIda.value = "";
    dataVolta.value = "";
  } else {
    alert("Por favor preencha todos os campos!");
  }
}

function carregaViagem() {
  let viagens = Array();

  viagens = bd.recuperarTodosRegistros();
  //Tbody
  let listaViagens = document.getElementById("listaViagens");
  //listando as viagens
  viagens.forEach(function (v) {
    //tr
    let linha = listaViagens.insertRow();
    //td
    linha.insertCell(0).innerHTML = v.origem;
    linha.insertCell(1).innerHTML = v.destino;
    linha.insertCell(2).innerHTML = v.dataIda;
    linha.insertCell(3).innerHTML = v.dataVolta;
    //btn delete
    let btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-outline-danger";
    btnDelete.innerHTML = '<i class="fas fa-times p-1"></i>';
    btnDelete.id = `id_viagem_${v.id}`;
    btnDelete.onclick = function () {
      let id = this.id.replace("id_viagem_", "");
      bd.remover(id);
      window.location.reload();
    };
    linha.insertCell(4).append(btnDelete);
    //btn
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-dark btn-sm";
    btn.innerHTML = '<i class="fas fa-search-location p-2"></i>';
    btn.id = `id_viagem_${v.id}`;
    btn.onclick = function () {
      let id = this.id.replace("id_viagem_", "");
      alert('Aguarde estamos buscando os melhores Hotéis')
    };
    linha.insertCell(5).append(btn);
  });
}