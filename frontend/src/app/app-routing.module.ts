import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRegisterComponent } from './pages/customer-register/customer-register.component';
import { SuccessRegisterComponent } from './pages/success-register/success-register.component';

const routes: Routes = [
  { path: 'registrar', component: CustomerRegisterComponent },
  { path: 'sucesso', component: SuccessRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
