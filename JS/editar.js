editar()
// vai ser chamda pelo botão salvar
function editar() {
  let participantes = JSON.parse(localStorage.getItem('participantes'))
  let indice_selecionado = JSON.parse(
    localStorage.getItem('indice_selecionado')
  )

  let user = participantes[indice_selecionado]

  let inputNome = document.querySelector('.container #nome')
  let inputEmail = document.querySelector('.container #email')

  inputNome.value = user.nome
  inputEmail.value = user.email
}

function editou() {
  let indice_selecionado = JSON.parse(
    localStorage.getItem('indice_selecionado')
  )
  let participantes = JSON.parse(localStorage.getItem('participantes'))
  const participanteAtualizado = {
    nome: document.querySelector('.container #nome').value,
    email: document.querySelector('.container #email').value
  }

  participantes[indice_selecionado].nome = participanteAtualizado.nome
  participantes[indice_selecionado].email = participanteAtualizado.email

  localStorage.setItem('participantes', JSON.stringify(participantes))

  document.getElementById('modal-overlay-salvo-sucesso').className += ' active'
}

function fecharModal() {
  document.getElementById('modal-overlay-salvo-sucesso').className =
    'modal-overlay'

  window.location.href = '../HTML/participantes.html'
}
