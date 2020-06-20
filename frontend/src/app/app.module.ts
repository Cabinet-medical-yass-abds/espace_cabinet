import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LoginDoctorComponent } from './doctor/login-doctor/login-doctor.component';
import { LoginSecretaryComponent } from './secretary/login-secretary/login-secretary.component';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'admin', component: LoginComponent },
  { path : 'doctor' , component : LoginDoctorComponent },
  { path : 'secretary' , component : LoginSecretaryComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginDoctorComponent,
    LoginSecretaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
