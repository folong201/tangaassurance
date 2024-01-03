import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SkeletonComponent } from './pages/visitor/skeleton/skeleton.component';
import { TesterComponent } from './components/tester/tester.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { WhileusComponent } from './components/whileus/whileus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { TestimonyComponent } from './components/testimony/testimony.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdashboardskeletonComponent } from './pages/users/userdashboardskeleton/userdashboardskeleton.component';
import { UsercontactadminComponent } from './pages/users/usercontactadmin/usercontactadmin.component';
import { UserhomeComponent } from './pages/users/userhome/userhome.component';
import { AdminskeletonComponent } from './pages/admin/adminskeleton/adminskeleton.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Page404Component } from './components/page404/page404.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { InactiveassuranceComponent } from './pages/admin/inactiveassurance/inactiveassurance.component';
import { ArelancerComponent } from './pages/admin/arelancer/arelancer.component';
import { AssurancelistComponent } from './pages/admin/assurancelist/assurancelist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserdetailsComponent } from './pages/admin/userdetails/userdetails.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, } from '@angular/material/dialog';
import { MyHttpInterceptor } from './interceptors/my-http-interceptor.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminmessageComponent } from './pages/admin/adminmessage/adminmessage.component';
import { ContactuspageComponent } from './components/contactuspage/contactuspage.component';


@NgModule({
  declarations: [
    AppComponent,
    TesterComponent,
    FooterComponent,
    NavBarComponent,
    SkeletonComponent,
    RegisterComponent,
    LoginComponent,
    HerosectionComponent,
    WhileusComponent,
    ContactusComponent,
    TestimonyComponent,
    UserdashboardskeletonComponent,
    UsercontactadminComponent,
    UserhomeComponent,
    AdminskeletonComponent,
    AdminhomeComponent,
    Page404Component,
    InactiveassuranceComponent,
    ArelancerComponent,
    AssurancelistComponent,
    UserdetailsComponent,
    AdminmessageComponent,
    ContactuspageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
