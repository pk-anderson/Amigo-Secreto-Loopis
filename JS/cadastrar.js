let participantes = []

if (localStorage.getItem('participantes')) {
  participantes = JSON.parse(localStorage.getItem('participantes'))
} else {
  participantes = []
}

/***** Função Adicionar *****/
function cadastrar(num) {
  let participante = {
    nome: document.querySelector('#nome').value,
    email: document.querySelector('#email').value
  }
  participantes.push(participante)
  localStorage.setItem('participantes', JSON.stringify(participantes))
  if (num == 0) {
    return (window.location.href = '../HTML/participantes.html')
  } else {
    cadastrarOutro()
  }
}

function cadastrarOutro() {
  document.getElementById('modal-overlay-cadastrar-sucesso').className +=
    ' active'
}

function cadastroSucesso() {
  document.getElementById('modal-overlay-cadastrar-sucesso').className =
    ' modal-overlay'
}
