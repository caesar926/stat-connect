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

const userName = localStorage.getItem('uerName')
document.querySelector('.name').textContent = (userName)

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
loginSubmit.addEventListener('click', (e)=> {
 e.preventDefault()

 const email = loginEmail.value
 const password = loginPassword.value  

 signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user
   
    document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none')
    document.getElementById('home-page').style.display = ''
   
    localStorage.setItem('userName', regFirstname.value)
   

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelector('[data-page="home-page"]').classList.add('active')
})
 .catch((error) => {
    console.log(error.message)
 })
})
/********************REG LOGIC**************************/

regSubmit.addEventListener('click', (e)=>{
    e.preventDefault()

    const firstNmae = regFirstname.value;
    const lastNmae = regLastname.value;
    const email = regEmail.value;
    const password = regPassword.value;

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user
   
    document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none')
    document.getElementById('home-page').style.display = ''
   
    document.querySelector('.name').textContent = user.email.split('@')[0] + ' '
   

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelector('[data-page="home-page"]').classList.add('active')
    localStorage.setItem('userName', regFirstname.value)
})  
    .catch((error) => {
        console.log(error.message)
    })
})
