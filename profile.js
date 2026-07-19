import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from './firebase.js'

const loginEmail = document.getElementById('email')
const loginPassword = document.getElementById('password')
const loginSubmit = document.querySelector('.btn-primary')

const regFirstname = document.getElementById('reg-firstname')
const regLastname = document.getElementById('reg-lastname')
const regEmail = document.getElementById('reg-email')
const regPassword = document.getElementById('reg-password')
const regSubmit = document.querySelector('.submit')

const loginBtn = document.querySelector(".login-Btn");
const createBtn = document.querySelector(".btn-secondary");
const loginPage = document.querySelector(".login-main");
const registerPage = document.querySelector(".reg-main");
const eyes = document.querySelectorAll
('.toggle-visibility')
const userName = localStorage.getItem('userName')
const eyeIcons = document.querySelectorAll('eye-icon')

onAuthStateChanged(auth, (user) => {
    if (user) {
        // user is logged in — show home page
        document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none')
        document.getElementById('home-page').style.display = ''
        const userName = localStorage.getItem('userName')
        document.querySelector('.name').textContent = (userName || user.email.split('@')[0]) + ' 👋'
    } else {
        // no user — show profile/login page
        document.getElementById('profile-page').style.display = ''
    }
})

createBtn.addEventListener("click", (e) => {
    e.preventDefault();

    loginPage.classList.add("hide-page");

    setTimeout(() => {
        loginPage.style.display = "none";

        registerPage.style.display = "flex";
        registerPage.classList.remove("hide-page");
        registerPage.classList.add("show-page");
    }, 350);
});

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    registerPage.classList.add("hide-page");

    setTimeout(() => {
        registerPage.style.display = "none";

        loginPage.style.display = "flex";
        loginPage.classList.remove("hide-page");
        loginPage.classList.add("show-page");
    }, 350);
});


/************************************************/
function getErrorMessage(code) {
    const errors = {
        'auth/invalid-credential': 'Invalid email or password',
        'auth/email-already-in-use': 'Email already registered',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/invalid-email': 'Please enter a valid email'
    }
    return errors[code] || 'Something went wrong, please try again'
}

loginSubmit.addEventListener('click', (e)=> {
 e.preventDefault()

 const email = loginEmail.value
 const password = loginPassword.value  

 loginSubmit.disabled = true
 loginSubmit.textContent = 'Logging in...'
 document.getElementById('login-error').style.display = 'none'

 signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    loginSubmit.disabled = false
    loginSubmit.textContent = 'Login'


    const user = userCredential.user
    document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none')
    document.getElementById('home-page').style.display = ''
   
    const userName = localStorage.getItem('userName')
    document.querySelector('.name').textContent = (userName || user.email.split('@')[0]) + ' 👋'

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelector('[data-page="home-page"]').classList.add('active')
})
 .catch((error) => {
    document.getElementById('login-error').style.display= 'block'
    document.getElementById('login-error').textContent = getErrorMessage(error.code) 
    loginSubmit.disabled = false
    loginSubmit.textContent = 'Login'
    console.log(error.message)
 })
})
/********************REG LOGIC**************************/

regSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
   regSubmit.disabled = true
   regSubmit.textContent = ' Registering...'
   document.getElementById('reg-error').style.display = 'none'

    const firstNmae = regFirstname.value;
    const lastNmae = regLastname.value;
    const email = regEmail.value;
    const password = regPassword.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    regSubmit.disabled = false
    regSubmit.textContent = 'Register'
    const user = userCredential.user
   
    document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none')
    document.getElementById('home-page').style.display = ''
   
    document.querySelector('.name').textContent = firstNmae + ' '
   

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelector('[data-page="home-page"]').classList.add('active')
    localStorage.setItem('userName', regFirstname.value)
})  
    .catch((error) => {
    document.getElementById('reg-error').style.display= 'block'
    document.getElementById('reg-error').textContent =  getErrorMessage(error.code) 
    regSubmit.disabled = false
    regSubmit.textContent = 'Register'
        console.log(error.message)
    })
})


eyes.forEach(eye => {
    eye.addEventListener('click', ()=>{
    if (loginPassword.type === 'password'){
        loginPassword.type = 'text'
        document.getElementById('eye-icon').innerHTML=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M2 2L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6.71 6.71A7.07 7.07 0 0 0 3 10s3 6 7 6a6.9 6.9 0 0 0 3.29-.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M13.58 13.58A7.07 7.07 0 0 0 17 10s-3-6-7-6a6.9 6.9 0 0 0-3.29.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`

    }else{
        loginPassword.type = 'password'
        document.getElementById('eye-icon').innerHTML=`<svg class="eye-icon" id="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`
    }
});

})

eyes.forEach(eye => {
    eye.addEventListener('click', ()=>{
    if (regPassword.type === 'password'){
        regPassword.type = 'text'
        document.getElementById('eyes-icon').innerHTML=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M2 2L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6.71 6.71A7.07 7.07 0 0 0 3 10s3 6 7 6a6.9 6.9 0 0 0 3.29-.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M13.58 13.58A7.07 7.07 0 0 0 17 10s-3-6-7-6a6.9 6.9 0 0 0-3.29.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`

    }else{
        regPassword.type = 'password'
        document.getElementById('eyes-icon').innerHTML=`<svg class="eye-icon" id="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`
    }
});

})
