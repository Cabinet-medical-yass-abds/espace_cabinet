import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginDoctorComponent } from './doctor/login-doctor/login-doctor.component';
import { LoginSecretaryComponent } from './secretary/login-secretary/login-secretary.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { FormsModule } from '@angular/forms';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: LayoutComponent,
    children: [
      {
        path: 'dashboard', // child route path
        component: DashboardComponent // child route component that the router renders
      },
      {
        path: 'doctors', // child route path
        component: DoctorsComponent // child route component that the router renders
      },
    ]
  },
  { path : 'doctor' , component : LoginDoctorComponent },
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
    DoctorsComponent
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
