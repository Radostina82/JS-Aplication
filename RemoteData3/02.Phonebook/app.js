function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadPhones);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
    //  document.getElementById('btnDelete').addEventListener('click', (ev)=>{
    //  console.log(ev);
    // });

    loadPhones();
}

attachEvents();
const phoneBook = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

async function onCreate() {
    phoneBook.replaceChildren();
    const person = personInput.value.trim();
    const phone = phoneInput.value.trim();

    await createContact({ person, phone });

    personInput.value = '';
    phoneInput.value = '';
   phoneBook.appendChild(onLoad({ person, phone }));

}

async function onLoad(contact) {
    const liElement = document.createElement('li');
    liElement.textContent = `${contact.person}: ${contact.phone}`;
    const btnDelete = document.createElement('button');
    btnDelete.id = `${contact._id}`;
    btnDelete.textContent = 'Delete';
    liElement.appendChild(btnDelete);

    return liElement;
}

async function loadPhones() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url);
    const data = await res.json();
   
    phoneBook.replaceChildren(...Object.values(data).map(onLoad));
   

}


async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}

async function deleteContact(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;
    const res = await fetch(url, { method: 'delete' });
    const result = await res.json();
    return result;
}