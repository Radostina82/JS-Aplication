async function lockedProfile() { 
    const mainElement = document.getElementById('main');
mainElement.replaceChildren();
   const data = await getData(); 
   
   Object.values(data).forEach(p=>{
   const divElement = document.createElement('div');
   divElement.classList.add('profile');
   const img = document.createElement('img');
   img.src = './iconProfile2.png';
   img.classList.add = 'userIcon';
   const lableLock = document.createElement('label');
   lableLock.textContent = 'Lock';
   const input1 = document.createElement('input');
   input1.type = 'radio';


   })
    
}

async function getData(){
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const res = await fetch(url);
    const data = await res.json();

    return data;
}