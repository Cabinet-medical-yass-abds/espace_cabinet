import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/doctor';



  // Login doctor 
  LoginDoctor(doctor) {
    return this.http.post(`${this.url}/loginDoctor/`,doctor);
  }

  // Listing secretaries 
  getSecretaries(doc_id) {
    return this.http.get(`${this.url}/allSecretaries/`+doc_id);
  }

  addSecretary(secretary,doc_id) {
    return this.http.get(`${this.url}/addSecretary/`+doc_id,secretary);
  }

  getDoctorById(id_doctor) {
    return this.http.get(`${this.url}/getDoc/`+id_doctor);
  }


}
