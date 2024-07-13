const login = document.querySelector('.login')
const formDiv = document.querySelector('form')
const registro = document.querySelector('.registro')
const userName = document.querySelector('.username')
const password = document.querySelector('.password')
const logar = document.querySelector('.logar')
const record = document.querySelector('.record')
const home = document.querySelector('.home')


record.addEventListener('click', function(){
    login.style.display = 'none'
    registro.style.display = 'flex'
})

const users = [];

const form = document.getElementById('registerForm');


form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores dos inputs
    const newUser = document.getElementById('newuser').value;
    const newPass = document.getElementById('newpass').value;

    const user = {
        username: newUser,
        password: newPass
    };
    users.push(user);
    form.reset();
    console.log(users);

    if(newUser === "" || newPass === ""){ 
        alert('Campos obrigatorios');
    }else{
        registro.style.display = 'none'
        login.style.display = 'flex'
    }
});

login.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    const userName = document.querySelector('.username').value
    const password = document.querySelector('.password').value
    const error = document.querySelector('.error')
    const mensage = document.createElement('p')

    const user = users.find(user => user.username === userName && user.password === password)
    
    if(user){
        login.style.display = 'none'
        home.style.display = 'flex'

    }else{
        mensage.textContent  = 'Usuário ou senha incorreta!'
        error.appendChild(mensage)
    }
});