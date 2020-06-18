import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getPatient() {
    return this.http.get(`${this.uri}/listAll`);
  }

  addPatient(nom, prenom , email, password) {
    const pa = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/addone`, pa);
  }

  updatePatient(id,nom, prenom, email, password) {
    const pa = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/update/${id}`, pa);
  }


  deletePatient(id) {
    return this.http.delete(`${this.uri}/delete/${id}`);
  }
}
