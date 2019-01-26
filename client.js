var titleElement = document.getElementById('title');
var descriptionE = document.getElementById('description');
var form = document.getElementById('post-form');
var postList = document.getElementById('post-list');
var spinner = document.querySelector('.spinner-border');
var btn = document.getElementById('post-btn');
var errorElement = document.getElementById('errorElement');

errorElement.style.display = 'none';

let page = 1;
let pageSize = 5;
spinner.style.display = '';

const API_URL = `http://localhost:5000/api/posts`;

var listAllPosts = function(reset = true) { 
  if(reset) {
  postList.innerHTML = '';
  page = 1;
  }
  fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`)
  .then(res => res.json())
  .then(posts => {
    spinner.style.display = 'none';
       posts.forEach(function(post) {
         var div = document.createElement('div');
        var h1 = document.createElement('h1');
        var p = document.createElement('p');

        div.classList.add('card');
        h1.classList.add('card-title');
        p.classList.add('card-text');

        div.style.margin = '10px';
        div.style.padding = '5px';
        h1.textContent = post.title;
        p.textContent = post.content;

        div.appendChild(h1);
        div.appendChild(p);

        postList.appendChild(div);
       });
  });
}

window.addEventListener('load', function(){
  listAllPosts();
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
   
     const formData = new FormData(form);

     const title = formData.get('title');
     const content = formData.get('content');

     if(title.trim() && content.trim()) {
      spinner.style.display = '';
      errorElement.style.display = 'none'; 
    

      //  console.log(title,description);
  
         const post = {
           title,
           content
         };
  
         console.log('form submitted');
         form.style.display = 'none';
  
        //create a post request
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(createdPost => {
        console.log(createdPost);
        form.style.display = '';
        spinner.style.display = 'none';
        form.reset();
        listAllPosts();
      });
     }
     else {
       errorElement.textContent = 'Title and description are required!! 😁😁';
       errorElement.style.display = '';
       description.classList.add('is-invalid');
       titleElement.classList.add('is-invalid');
     }
   
});

function loadMore() {
  page++;
  listAllPosts(false);
}

document.addEventListener('scroll',function() {
  if((window.innerHeight  + window.scrollY) >= document.body.offsetHeight) {
    loadMore();
  } 
});
