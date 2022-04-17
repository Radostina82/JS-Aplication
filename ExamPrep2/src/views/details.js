import { getBookById, deleteById, getLikesByBook, getMyLikesByBook } from '../api/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, likes, hasLike) => html`
<!-- Details Page ( for Guests and Users ) -->
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                   ${booksControlTemplate(book, isOwner, onDelete)}
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    
                    <!-- ( for Guests and Users )  -->
                   
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`;

/*<!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        <a class="button" href="#">Like</a>

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
        <!-- Bonus --> */

const booksControlTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData();


    const [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBook(ctx.params.id),
        userData ? getMyLikesByBook(ctx.params.id, userData.id) : 0]);
    
    const isOwner = userData && userData.id == book._ownerId;
    ctx.render(detailsTemplate( book, isOwner, onDelete, likes, hasLike));

    async function onDelete() {
        const chois = confirm('Are you sure yuo want to delete');

        if (chois) {
            await deleteById(ctx.params.id); //book._id - може и това
            ctx.page.redirect('/');
        }
    }
}