import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: MapaComponent},
  { path: 'home', component: MapaComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactoComponent},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
