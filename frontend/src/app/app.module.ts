import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListComponent } from './patient/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './patient/create/create.component';
import { UpdateComponent } from './patient/update/update.component';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'patientsList', component: ListComponent },
  { path : 'updatePatient/:id' , component : UpdateComponent},
  { path : 'createPatient' , component : CreateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
