import {  getAllAlbums, getSearch } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (onClick,onChange, searchAlbum=[]) => html`
<!--Search Page-->
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" @input=${onChange}>
                <button @click = ${onClick} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            ${searchAlbum.length == 0 ? html`<p class="no-result">No result.</p>`
        : searchAlbum.map(albumCard)}
            <!--Show after click Search button-->
            

                <!--If there are no matches-->
                
            </div>
        </section>
`;
const albumCard = (album) =>{
    const userData = getUserData();
    if(userData){
        return html` <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    <div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>
                </div>
            </div>`;
    }else{
        return html` <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            <div class="card-box">
                <img src=${album.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                   
                </div>
            </div>`;
    }
}

export async function searchPage(ctx){
    let currentChange = '';
   

    function onChange(e){
        currentChange = e.target.value;
    }
    async function onClick(ev){
        ev.preventDefault();
      const name = currentChange;
        const searchAlbum = await getSearch(name);
        ctx.render(searchTemplate(onClick,onChange, searchAlbum));
     
    }
    ctx.render(searchTemplate(onClick, onChange));
}