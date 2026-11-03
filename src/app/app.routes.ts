import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';


export const routes: Routes = [
    {path: 'products/catalog', component: CatalogoComponent},
    {path: '', redirectTo: 'products/catalog', pathMatch:'full'},
    {path: '**', redirectTo: 'products/catalog'}

];
