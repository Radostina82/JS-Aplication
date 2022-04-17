const tbody = document.querySelector('tbody');
document.getElementById('loadBooks').addEventListener('click', loadBooks);
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);
loadBooks();

async function onEditSubmit(ev){
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, { author, title });
    tbody.appendChild(createRow(result._id, result));
    ev.target.reset();
    loadBooks();

}

function onTableClick(ev) {
    if (ev.target.className == 'delete') {
        onDelete(ev.target);
    } else if (ev.target.className == 'edit') {
        onEdit(ev.target);
    }
}

async function onEdit(button){
    const id = button.parentElement.dataset.id;
    const book = await loadBook(id);
    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function onCreate(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    tbody.appendChild(createRow(result._id, result));
    ev.target.reset();
}

async function loadBook(id){
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);

    return book;
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td  data-id=${id}>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
</td>`;

    return row;
}

async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });

    return result;
}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });

    return result;
}

async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    return result;
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
    }
    const response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.massage);
        throw new Error(error.massage);
    }
    const data = await response.json();

    return data;
}
