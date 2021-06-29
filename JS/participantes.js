let indice_selecionado = -1
/***** Listar Participantes *****/
function listar() {
  //let cards = document.getElementsByTagName('section')
  let linhas = ''
  let users = JSON.parse(localStorage.getItem('participantes'))

  for (let i in users) {
    let participante = users[i]
    if (participante.nome != null) {
      linhas = `<div class="card card${i}">
                  <div class="card_info">
                    <div class="cards_nome">
                      <p>${participante.nome}</p>
                    </div>
                    <div class="icons">
                      <i id="editar_card" class="icon">
                        <img src="../assets/Vectoreditar.png" alt ='${i}' onclick='chamarEditar(this)'>
                      </i>
                      <i id="excluir_card" class="icon">
                        <img src="../assets/Vectorexcluir.png" alt ='${i}' onclick='chamaModal(this)'>
                      </i>
                    </div>
                    <div class="email">
                        <p>${participante.email}</p>
                    </div>
                  </div>
                </div>`
      document
        .querySelector('#cards-container')
        .insertAdjacentHTML('beforeend', linhas)
    }
  }
}

/***** Função Excluir *****/
function chamaModal(e) {
  indice_selecionado = parseInt(e.getAttribute('alt'))
  let participante = JSON.parse(localStorage.getItem('participantes'))
  let user = participante[indice_selecionado]

  let nome = user.nome
  document.querySelector('.msg span').innerHTML = nome

  document.getElementById('modal-overlay-excluir').className += ' active'
}

function cancelar() {
  document.getElementById('modal-overlay-excluir').className = 'modal-overlay'
}

function handleDeletar() {
  document.getElementById('modal-overlay-excluir').className = 'modal-overlay'
  deletar(indice_selecionado)
}

function deletar(indice) {
  let users = JSON.parse(localStorage.getItem('participantes'))
  users.splice(indice, 1)

  localStorage.setItem('participantes', JSON.stringify(users))
  document.getElementById('modal-overlay-sucesso').className += ' active'
  //alert('Registro excluído ')
}

function sucesso() {
  document.getElementById('modal-overlay-sucesso').className += 'modal-overlay'
  window.location.href = '../HTML/participantes.html'
  //location.reload()
}

function chamarEditar(e) {
  indice_selecionado = parseInt(e.getAttribute('alt'))
  localStorage.setItem('indice_selecionado', JSON.stringify(indice_selecionado))
  window.location.href = '../HTML/EditarAmigoSecretoLoopis.html'
}

function salvo() {
  document.getElementById('modal-overlay-sorteio-sucesso').className =
    'modal-overlay'
  document.getElementById('modal-overlay-salvo-sucesso').className =
    'modal-overlay'

  document.getElementById('modal-overlay-sorteio-email').className =
    'modal-overlay'

  location.reload()
}

function adicionar() {
  window.location.href = '../HTML/cadastrar.html'
}

/***** Função Sorteio Normal *****/
//pego o nome aleatorio do array
function pairs() {
  const _pairs = []
  let cont = 0
  let vazio = 0
  // Copia o array para que as alterações dentro da função não sejam
  // refletidas no array original fora da função
  const friendList = JSON.parse(localStorage.getItem('participantes'))

  // Sorteia aleatoriamente as posições dos nomes
  friendList.sort(randOrd)

  // Associa cada nome com seu sucessor e o último com o primeiro
  for (let i = 0; i < friendList.length; i++) {
    _pairs.push([
      friendList[i],
      friendList[i != friendList.length - 1 ? i + 1 : 0]
    ])
    //console.log(_pairs[i][i].email)
  }
  for (let j = 0; j < _pairs.length; j++) {
    for (let a = 0; a < _pairs[j].length; a++) {
      if (_pairs[j][a].email === '') {
        vazio++
        return modalPairs(_pairs)
      }
    }
    cont++
  }
  if (cont == _pairs.length && vazio == 0) {
    return modalEmail(_pairs)
  }
}

function randOrd() {
  return Math.round(Math.random()) - 0.5
}

function modalPairs(_pairs) {
  let linhas

  for (let i in _pairs) {
    let amigo = _pairs[i][0].nome
    let amigoSecret = _pairs[i][1].nome

    linhas = `<p>${amigo} - ${amigoSecret}</p>`

    document.querySelector('#result').insertAdjacentHTML('beforeend', linhas)
    document.getElementById('modal-overlay-sorteio-sucesso').className +=
      ' active'
  }
}

function modalEmail(_pairs) {
  console.log(_pairs)
  let friend
  let friendSecret
  for (let i = 0; i < _pairs.length; i++) {
    friend = JSON.parse(JSON.stringify(_pairs[i][0].email))
    friendSecret = JSON.parse(JSON.stringify(_pairs[i][1].nome))
    console.log(friend)

    //Enviar notificação para os emails
    Email.send({
      SecureToken: '0b2f4b4f-cafd-4f80-8a26-8cf8b4fad31e',
      To: friend,
      From: 'pk.anderson9595@gmail.com',
      Subject: 'Amigo Secreto Loopis',
      Body: friendSecret
    }).then(message => {
      alert(message)
    })
  }

  document.getElementById('modal-overlay-sorteio-email').className += ' active'
}
