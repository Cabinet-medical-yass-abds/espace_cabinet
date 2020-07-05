import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/admin';

  // Doctors 
  getAlldoctors() {
    return this.http.get(`${this.url}/listAll`);
  }

  deleteDoctor(id) {
    console.log('id doctor service',id);
    return this.http.get(`${this.url}/delete/`+id);
  }

  addDoctor(object) {
    return this.http.post(`${this.url}/addOne`,object);
  }

  updateDoctor(doctor) {
    return this.http.post(`${this.url}/update/`+doctor.id_user._id,doctor);
  }

  // Secretaries
  getAllSecretaries() {
    return this.http.get(`${this.url}/listAllSecretaries`);
  }

  addSecretary(secretary) {
    return this.http.post(`${this.url}/addOneSecretary`,secretary);
  }
  deleteSecretary(id) {
    return this.http.get(`${this.url}/deleteSec/`+id);
  }
  updateSecretary(secretary) {
    return this.http.post(`${this.url}/updateSec/`+secretary.id_user._id,secretary);
  }

  // Patients 
  getAllPatients() {
    return this.http.get(`${this.url}/listpatient`);
  }

  //Claims 
  getAllClaims() {
    return this.http.get(`${this.url}/listclaim`);
  }

}
