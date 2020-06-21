import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/admin';

  getAlldoctors() {
    return this.http.get(`${this.url}/listAll`);
  }

  deleteDoctor(id) {
    console.log('id doctor service',id);
    return this.http.get(`${this.url}/delete/`+id);
  }
}
