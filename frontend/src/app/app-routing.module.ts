import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRegisterComponent } from './pages/user-register/customer-register.component';

const routes: Routes = [
  { path: 'registrar', component: CustomerRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
