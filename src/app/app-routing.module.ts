import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCardsComponent } from './lista-cards/lista-cards.component';

const routes: Routes = [
  { path: 'lista', component: ListaCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
