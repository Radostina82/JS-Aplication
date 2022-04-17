import { editCar, getCarById } from '../api/data.js';
import {html} from '../lib.js';


const editTemplate = (car, onSubmit)=> html`
<!-- Edit Listing Page -->
<section id="edit-listing">
    <div class="container">
    
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
    
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>
    
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>
    
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value=${car.description}>
    
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>
    
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>
    
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>
    
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
    </section>`;

    export async function editPage(ctx){
        const car = await getCarById(ctx.params.id);
        ctx.render(editTemplate(car, onSubmit));

        async function onSubmit(ev){
            ev.preventDefault();
        const formData = new FormData(ev.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = formData.get('year');
        const price = formData.get('price');
        const imageUrl = formData.get('imageUrl');

        if(brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == ''){
            return alert('All feilds are required!');
        }

        if(year < 0 || price < 0){
            return alert('Price and year must be positive!');
        }


        await editCar(ctx.params.id, {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        });

        ctx.page.redirect('/details/' + ctx.params.id);
        }
    }