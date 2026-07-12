const tags = document.querySelectorAll('.course-tags');
const activeCourse = document.querySelectorAll('.course-cont');
const search = document.querySelector('.mat-search');
const allPage = document.querySelectorAll('.page-section');
const backs = document.querySelectorAll('.back');


const courseData = {
    'STA 121': {
        title: 'Introduction to Statistics I',
        topics: [
          { name: 'Introduction to Data', pdf:'pdfs/STA121-intro.pdf'},
          { name: 'Measures of Central Tendency', pdf:null},
          { name: 'Frequency Distribution', pdf:null}

        ]
    },

    'STA 231': {
        title: 'Probability Theory I',
        topics: [
          {name:'Basic Probability', pdf:null},
          {name:'Random Variables', pdf:null},
          {name:'Normal Distrubtion', pdf:null}    
        ]
    },

    'STA 311' : {
      title:'Statistical Inference',
      topics:[
          {name:'Estimation Theory',  pdf:null},
          {name: 'Hypothesis testing', pdf:null},
          {name:'Analysis of variance', pdf:null}  
      ]
    },

    'GST 111' :{
      title: 'Introduction to English',
      topics:[
        {name:'Parts of Speech',  pdf:null},
          {name: 'sentence Structure', pdf:null},
          {name:'comprehension', pdf:null}  
      ]
    }
}


backs.forEach(back => {
  back.addEventListener('click', ()=>{
    allPage.forEach(page => page.style.display='none');
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


/************************TAGS***********************/
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














/*for (const [name, course] of Object.entries(courseData))    
  {
  console.log(name);          // STA 121
  console.log(course.title);  // Introduction to Statistics I
  console.log(course.topics); // Array of topics

  course.topics.forEach(topic => {
  console.log(topic);
  });
}*/