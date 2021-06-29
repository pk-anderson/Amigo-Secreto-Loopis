const Validate = {
  isEmail(input) {
    Validate.clearErrors(input)
    let value = input.value
    let error = null
    const formatEmail = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)(\.\w{2,3})+$/
    if (value.search(formatEmail) == -1 || value == null) {
      error = 'Email invalido'
      Validate.displayError(input, error)
      return
    }
    input.value = value
  },
  isName(input) {
    Validate.clearErrors(input)
    let value = input.value
    let error = null
    const formatName = /^[a-z ]+$/i
    if (value.search(formatName) == -1 || value == null) {
      error = 'Nome invalido'
      Validate.displayError(input, error)
      return
    }
    input.value = value
  },
  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector('.error')
    if (errorDiv) {
      errorDiv.remove()
    }
  },
  displayError(input, error) {
    const div = document.createElement('div')
    div.classList.add('error')
    div.innerHTML = error
    input.parentNode.appendChild(div)
    input.focus()
  }
}
