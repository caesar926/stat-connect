const tags = document.querySelectorAll('.course-tags');
const activeCourse = document.querySelectorAll('.course-cont');
const search = document.querySelector('.mat-search');
const allPages = document.querySelectorAll('.page-section');
const backs = document.querySelectorAll('.back');


const courseData = {
    'SDA 221': {
        title: 'Introduction to  R  Programming',
        topics: [
          {name:'Basic Probability', pdf:null},
          {name:'Random Variables', pdf:null},
          {name:'Normal Distrubtion', pdf:null}    
        ]
    },

    'COS 221': {
        title: 'Computer programming',
        topics: [
          {name:'Basic Probability', pdf:null},
          {name:'Random Variables', pdf:null},
          {name:'Normal Distrubtion', pdf:null}    
        ]
    },

    'MTH 221' : {
      title:'Introduction to numerical analysis',
      topics:[
          {name:'Estimation Theory',  pdf:null},
          {name: 'Hypothesis testing', pdf:null},
          {name:'Analysis of variance', pdf:null}  
      ]
    },

    'STA 223' :{
      title: 'Statistics for physical science and Engineering ',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'NS-STA 221' :{
      title: 'Introduction to economic modelling and econometrics',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'NS-STA 222' :{
      title: 'Introduction to data mining techniques',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'NS-STA 223' :{
      title: 'Classical and financial time series',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'NS-STA 224' :{
      title: 'Introduction to spatial statistics ',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'CSC 123' :{
      title: 'Introduction to database Management',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    },

    'NS-DTS 224' :{
      title: 'Introduction to structured query Language',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    }
}




backs.forEach(back => {
  back.addEventListener('click', ()=>{
    allPages.forEach(page => page.style.display='none');
    const activepg = document.getElementById("materials-page");
    activepg.style.display = '';

  })
})

/*****************CARD*************************/
activeCourse.forEach(card => {
  card.addEventListener('click', ()=> {
    const cardTexts = card.querySelector('.course-tag').textContent.toLowerCase()  

    const key = card.querySelector('.course-tag').textContent
    const course = courseData[key]
    console.log(course)

    document.getElementById('topics-title').textContent = course.title
    document.getElementById('topics-list').innerHTML = ''

  course.topics.forEach(topic => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    if(topic.pdf) {
    link.href = topic.pdf
    link.target = '_blank'
    link.textContent = topic.name
    li.appendChild(link)
    document.getElementById('topics-list').appendChild(li)
    } else {
      li.textContent =  topic.name
    }
   
})

allPages.forEach(page => page.style.display = 'none')
document.getElementById('topics-page').style.display = ''

 });
});


/***********************TAGS********************/
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tags.forEach(tag => tag.classList.remove('actives'));
     tag.classList.add('actives');
    const tagText = tag.textContent.toLocaleLowerCase()


   activeCourse.forEach(card => {
    const cardText = card.querySelector('.course-tag').textContent.toLowerCase()
    console.log(cardText)

    if(cardText === tagText || tagText === 'all') {
      card.style.display = '';
    }else{
      card.style.display = 'none';
    }
   })
  });
});

/********************SEARCH**************************/
search.addEventListener('input', () => {
  const searchText = search.value.toLowerCase()

  activeCourse.forEach(card => {
    const cardTexts = card.querySelector('.course-tag').textContent.toLowerCase()
    console.log(cardTexts)

     if(cardTexts.includes(searchText)) {
    card.style.display = '';
  }else{
      card.style.display = 'none';
    }
  })
})
