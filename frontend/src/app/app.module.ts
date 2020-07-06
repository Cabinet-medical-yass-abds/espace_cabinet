import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginSecretaryComponent } from './secretary/login-secretary/login-secretary.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SecretariesComponent } from './admin/secretaries/secretaries.component';

// Admin Imports 
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { ClaimsComponent } from './admin/claims/claims.component';

// Doctor Imports 
import { LayoutDoctorComponent } from './doctor/layout/layout.component';
import { HomeComponent } from './doctor/home/home.component';
import { SecretariesDoctorComponent } from './doctor/secretaries/secretaries.component';

registerLocaleData(localeFr, 'fr');
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
      {
        path: 'patients', 
        component: PatientsComponent
      },
      {
        path: 'claims',
        component: ClaimsComponent
      }
    ]
  },
  { path : 'doctor' , component : LayoutDoctorComponent,
    children: [
      {
        path: 'home/:id',
        component: HomeComponent
      },
      {
        path: 'secretaries',
        component: SecretariesDoctorComponent
      }
    ]
  },
  { path : 'secretary' , component : LoginSecretaryComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginSecretaryComponent,
    LandingComponent,
    DashboardComponent,
    LayoutComponent,
    DoctorsComponent,
    SecretariesComponent,
    PatientsComponent,
    ClaimsComponent,
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
