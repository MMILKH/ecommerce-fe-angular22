import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register.component/register.component';
import { CarrelloComponent } from './components/carrello.component/carrello.component';
import { AdminUserTableComponent } from './components/admin-user-table.component/admin-user-table.component';
import { AdminProductsTableComponent } from './components/admin-products-table.component/admin-products-table.component';
import { authGuard, adminGuard } from './guards/guard-guard';


export const routes: Routes = [

    {path: 'products/catalog', component: CatalogoComponent},
    {path: 'user/login',component: LoginComponent},
    {path: 'user/register',component:RegisterComponent},

    {path: 'cart', component:CarrelloComponent, canActivate:[authGuard]},

    {path: 'admin/user', component:AdminUserTableComponent,canActivate:[adminGuard]},
    {path: 'admin/products', component:AdminProductsTableComponent,canActivate:[adminGuard]},
    {path: '', redirectTo: 'products/catalog', pathMatch:'full'},
    {path: '**', redirectTo: 'products/catalog'},
];


