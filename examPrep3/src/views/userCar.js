import { getMyCars } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';

const userCarTemplate = (cars)=> html`
<!-- My Listings Page -->
<section id="my-listings">
<h1>My car listings</h1>
<div class="listings">

    <!-- Display all records -->
    ${cars.length == 0 ? html` <p class="no-cars"> You haven't listed any cars yet.</p>`
        : cars.map(mayCarsTemplate)}

    <!-- Display if there are no records -->
   
</div>
</section>`;

const mayCarsTemplate = (car)=>html`
<div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>Audi A3</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`;

export async function userCarsPage(ctx){

    const userData = getUserData();

    const cars = await getMyCars(userData.id);
    
   
    ctx.render(userCarTemplate(cars));
}