import { Component, OnInit } from '@angular/core';
import { doctor } from '../doctor.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private admin:AdminService) {}

  ad : doctor [];
  filteredDoctors: doctor[] = [];
  searchDoctor;
  emptyBool;

  d_name;
  d_fname;
  d_bio;
  d_adress;
  d_email;
  d_sex;
  d_spec;
  doctors;
  d_id;
  
  ngOnInit(): void {
    this.loadAllDoctors();
  }
  // Load all doctors
  loadAllDoctors() {
    this.admin.getAlldoctors().subscribe((data: doctor []) => {
      this.ad = data;
      console.log('Dotors:',data);
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  // Get Doctor informations
  doctorInfos(doctor) {
    this.d_name = doctor.name;
    this.d_fname = doctor.fname;
    this.d_bio = doctor.bio;
    this.d_adress = doctor.adress.city+', '+doctor.adress.street+', '+doctor.adress.zip;
    this.d_email = doctor.email;
    this.d_sex = doctor.man ? 'Homme' : 'Femme';
    this.d_spec = doctor.spec;
    this.d_id = doctor._id;
  }

  // Delete doctor by id
  deleteD(id) {
    this.admin.deleteDoctor(id).subscribe(() => {
      this.loadAllDoctors();
    })
  }
}
