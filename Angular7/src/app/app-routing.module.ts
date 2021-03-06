import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {path:'user', component:UserComponent, children:[
    {path: 'registration', component:RegistrationComponent},
    {path: 'login', component:LoginComponent}
  ] 
},
  {path: 'home', component:HomeComponent, canActivate:[AuthGuard]}
];

RouterModule.forRoot(routes,
  { useHash: true }
)
@NgModule({
  imports: [RouterModule.forRoot(routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
