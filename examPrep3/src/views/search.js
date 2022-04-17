import { getAllCars } from '../api/data.js';
import {html} from '../lib.js';

const searchTemplate = (onClick,onChange, cars = []) =>html`
<!-- Search Page -->
<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year" @input=${onChange}>
    <button @click = ${onClick} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="listings">

<!-- Display all records -->
${cars.length == 0 ? html`<p class="no-cars"> No results.</p>`
                    : cars.map(carCard)}

<!-- Display if there are no matches -->

</div>
</section>
`;
const carCard = (car) => html`
<div class="listing">
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
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

export async function searhPage(ctx){
    let currentChange = '';

    function onChange(e){
        currentChange = e.target.value;
    }
    async function onClick(ev){
        ev.preventDefault();
      const year = currentChange;
        const cars = await getAllCars();
        const filterCar = cars.filter(c=> c.year == year);

        ctx.render(searchTemplate(onClick,onChange, filterCar));
     
    }
    ctx.render(searchTemplate(onClick, onChange));
    
}