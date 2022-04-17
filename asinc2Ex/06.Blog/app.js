function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPost);
    document.getElementById('btnViewPost').addEventListener('click',displayPost );
}

attachEvents();

async function displayPost(){
    const selectId = document.getElementById('posts').value;

    const titleElement = document.getElementById('post-title');
    const bodyElement = document.getElementById('post-body');
    const comments = document.getElementById('post-comments');

    comments.replaceChildren();
    titleElement.textContent = 'Loading...';
    bodyElement.textContent = '';

    const[post, comment] = await Promise.all([getPostById(selectId), getComentsByPost(selectId)])

    
    titleElement.textContent = post.title;
    bodyElement.textContent = post.body;
    
    

    comment.forEach(c=>{
        const liElement = document.createElement('li');
        liElement.textContent = c.text;
        comments.appendChild(liElement);
    });
}

async function getAllPost(){
    const url = `http://localhost:3030/jsonstore/blog/posts`;
    const res = await fetch(url);
    const data = await res.json();

  const selectElement = document.getElementById('posts');
  selectElement.replaceChildren();

  Object.values(data).forEach(p => {
      const optionElement = document.createElement('option');
      optionElement.textContent = p.title;
      optionElement.value = p.id;

      selectElement.appendChild(optionElement);
  })
}

async function getPostById(postId){
    const url = `http://localhost:3030/jsonstore/blog/posts/` + postId;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getComentsByPost(postId){
    const url = `http://localhost:3030/jsonstore/blog/comments`;
    const res = await fetch(url);
    const data = await res.json();

    const comments = Object.values(data).filter(c=> c.postId == postId);

    return comments;
}