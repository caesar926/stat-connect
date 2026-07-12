const greet = document.querySelector('.greet');
const upItem = document.querySelectorAll('.upcoming-item');
const courseCard = document.querySelectorAll('.course-card')
const navBtn = document.querySelectorAll('.nav-btn');
const searchInput = document.querySelector('.search');
const bellBtn = document.querySelector('[aria-label="Notifications"]');
const nofic = document.querySelector('.absolute');
const toggle = document.querySelectorAll('.toggle-btn')
const allPages = document.querySelectorAll('.page-section')

 
 function saveToLocalstorage(key, value) {
     localStorage.setItem(key, value)
    }

 function loadFromLocalStorage(key) {
 return localStorage.getItem(key)
}


if (loadFromLocalStorage('notificationDismissed') === 'true'){
  nofic.style.display = 'none'
};

if(loadFromLocalStorage('activeNav')) {
 navBtn.forEach(btn => {
  if(btn.querySelector('span').textContent === localStorage.getItem('activeNav')){
    btn.classList.add('active')
  } else {
     btn.classList.remove('active');
  }
   
  allPages.forEach(page => page.style.display = 'none')
   const savedPage = loadFromLocalStorage('activeNav')
   const matchingBtn = [...navBtn].find(b => b.querySelector('span').textContent === savedPage)
  if (matchingBtn) {
    const activePg = document.getElementById(matchingBtn.dataset.page)
    activePg.style.display = ''
} 

 });
};

/******************GREET LOGIC*********************/
const time = new Date().getHours();

if (time >= 0 && time < 12) {
  greet.textContent = "Good morning,"
}

else if (time >= 12  && time < 18) {
  greet.textContent = "Good afternoon,"
} 

else {
  greet.textContent = "Good evening,"
}

/*********************DAYS LEFT*************************** */
upItem.forEach(item => {
  const dueDates = new Date(item.dataset.due);
  const current = new Date() 
  
  
  const diff = Math.floor((dueDates - current) / 86400000);

  item.querySelector('.up-days').textContent = diff +" days left"
 }
)

/*****************NAV BTN***********************/
navBtn.forEach(btn =>{
  btn.addEventListener('click', () => {
    navBtn.forEach(btns => btns.classList.remove('active'));
    btn.classList.add('active');
    
    const span = btn.querySelector('span').textContent

    allPages.forEach(page => page.style.display = "none");
    const activePg = document.getElementById(btn.dataset.page);
    activePg.style.display = '';
  
    saveToLocalstorage('activeNav', btn.querySelector('span').textContent)
    
  });
});

/*******************SEARCH INPUT***************/
searchInput.addEventListener('input', ()=>{
 const inputValue = searchInput.value.toLowerCase()
 console.log(inputValue);

 const activeFilter = document.querySelector('.toggle-btn.actives').dataset.filter

  if (activeFilter === 'courses') {
    courseCard.forEach(item =>{
    const course = item.querySelector('.course-tag').textContent.toLowerCase()

      if(course.includes(inputValue)){
        item.style.display ='';
      } else {
        item.style.display = 'none';
      }
    });
  } 
  
  else{
    upItem.forEach(item => {
    const title = item.querySelector('.up-title').textContent.toLowerCase()

    if(title.includes(inputValue)) {
      item.style.display = '';
    } else{
      item.style.display = 'none'
    }
  });
 }
});

/*** SEARCH TOGGLE LOGIC ***/
  toggle.forEach(tglBtn =>{
    tglBtn.addEventListener('click', ()=>{
    toggle.forEach(tglBtns => tglBtns.classList.remove('actives'));
      tglBtn.classList.add('actives')
    })
  })

/***************** BELL ************************/
bellBtn.addEventListener('click', () =>{
  nofic.style.display = 'none';

saveToLocalstorage('notificationDismissed', 'true')
});

