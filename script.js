const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) =>{
    let messages = []
    if(password.value.length <= 6 && password.value.length >= 20){
        messages.push('Password must have between 6 and 20 characters')
    }
    if(password.value === 'password'){
        messages.push('Password cant be password')
    }
    if(messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})

module.exports(name, password)