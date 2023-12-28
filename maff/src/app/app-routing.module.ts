import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './pages/visitor/skeleton/skeleton.component';

import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserdashboardskeletonComponent } from './pages/users/userdashboardskeleton/userdashboardskeleton.component';
import { UserhomeComponent } from './pages/users/userhome/userhome.component';
import { UsercontactadminComponent } from './pages/users/usercontactadmin/usercontactadmin.component';
import { AdminskeletonComponent } from './pages/admin/adminskeleton/adminskeleton.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { Page404Component } from './components/page404/page404.component';
import { AssurancelistComponent } from './pages/admin/assurancelist/assurancelist.component';
import { ArelancerComponent } from './pages/admin/arelancer/arelancer.component';
import { InactiveassuranceComponent } from './pages/admin/inactiveassurance/inactiveassurance.component';
import { UserdetailsComponent } from './pages/admin/userdetails/userdetails.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: SkeletonComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "auth/register", component: RegisterComponent },
  {
    path: 'user', component: UserdashboardskeletonComponent,
    children: [
      { path: 'home', component: UserhomeComponent },
      { path: 'contactadmin', component: UsercontactadminComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: "admin", component: AdminskeletonComponent,
    children: [
      { path: '', component: AdminhomeComponent },//liste de tout les clients
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'assurancelist',component:AssurancelistComponent},
      {path:'arelancer',component:ArelancerComponent},
      {path:'inactive',component:InactiveassuranceComponent},
      //route pour les user details
      { path: 'user/:id', component: UserdetailsComponent },
      // { path: 'user/:id', component: UserdetailsComponent,canActivate:[AuthGuard] }
    ]
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }