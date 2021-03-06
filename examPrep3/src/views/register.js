import { html } from '../lib.js';
import {register} from '../api/api.js';

const registerTemplate = (onSubmit) => html`
<!-- Register Page -->
<section id="register">
<div class="container">
    <form @submit=${onSubmit} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required>

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required>

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required>
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="/login">Sign in</a>.
        </p>
    </div>
</div>
</section>`;

export  function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const userName = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();

        if(userName == '' || password == '' || repeatPass == ''){
            return alert('All fields are required!');
        }

        if(password != repeatPass){
            return alert('Passoword dont match');
        }
        await register(userName, password);
        ctx.updateUserNave();
        ctx.page.redirect('/catalog');
    }
}