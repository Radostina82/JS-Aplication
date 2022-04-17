import {page, render} from './lib.js';
import { catalogPage } from './views/catalog.js';
import { homePage } from "./views/home.js";
import { loginPage } from './views/login.js';
import {logout} from './api/data.js';
//import * as api from './api/api.js';
import { registerPage } from './views/register.js';
import {getUserData} from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { userCarsPage } from './views/userCar.js';
import { searhPage } from './views/search.js';
//window.api = api;

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/catalog', catalogPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/mylistings/:id', userCarsPage);
page('/search', searhPage);

updateUserNave();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNave = updateUserNave;
    next();
}

function onLogout(){
    logout();
    updateUserNave();
    page.redirect('/');
}

function updateUserNave(){
    const userData = getUserData();

    if(userData){
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome, ${userData.username}`;
    }else{
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';

    }
}