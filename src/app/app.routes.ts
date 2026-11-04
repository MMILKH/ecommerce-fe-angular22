import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register.component/register.component';
import { CarrelloComponent } from './components/carrello.component/carrello.component';


export const routes: Routes = [
    {path: 'products/catalog', component: CatalogoComponent},
    {path: 'user/login',component: LoginComponent},
    {path: 'user/register',component:RegisterComponent},
    {path: 'cart', component:CarrelloComponent},
    {path: '', redirectTo: 'products/catalog', pathMatch:'full'},
    {path: '**', redirectTo: 'products/catalog'},
];


