import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginSecretaryComponent } from './secretary/login-secretary/login-secretary.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SecretariesComponent } from './admin/secretaries/secretaries.component';

// Admin Imports 
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';

// Doctor Imports 
import { LayoutDoctorComponent } from './doctor/layout/layout.component';
import { HomeComponent } from './doctor/home/home.component';
import { LoginDoctorComponent } from './doctor/login-doctor/login-doctor.component';
import { SecretariesDoctorComponent } from './doctor/secretaries/secretaries.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: LayoutComponent,
    children: [
      {
        path: 'dashboard', // child route path
        component: DashboardComponent // child route component that the router renders
      },
      {
        path: 'doctors', 
        component: DoctorsComponent
      },
      {
        path: 'secretaries', 
        component: SecretariesComponent
      },
    ]
  },
  { path : 'doctor' , component : LayoutDoctorComponent,
    children: [
      {
        path: 'home/:id',
        component: HomeComponent
      },
      {
        path: 'secretaries/:id',
        component: SecretariesDoctorComponent
      }
    ]
  },
  { path : 'secretary' , component : LoginSecretaryComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginDoctorComponent,
    LoginSecretaryComponent,
    LandingComponent,
    DashboardComponent,
    LayoutComponent,
    DoctorsComponent,
    SecretariesComponent,
    HomeComponent,
    LayoutDoctorComponent,
    SecretariesDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
