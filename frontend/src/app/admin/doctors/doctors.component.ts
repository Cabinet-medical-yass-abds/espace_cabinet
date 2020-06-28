import { Component, OnInit } from '@angular/core';
import { doctor } from '../doctor.model';
import { AdminService } from '../admin.service';
import {NgForm} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private admin:AdminService) {}

  ad : doctor [];
  doctor;
  searchDoctor;
  emptyBool;
  modify = false;
  doc_id;

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


  // Delete doctor by id
  deleteD(id) {
    this.admin.deleteDoctor(id).subscribe(() => {
      this.loadAllDoctors();
    })
  }

  // Add doctor
  onSubmit(f: NgForm) {
    console.log(f.value); 
    this.admin.addDoctor(f.value).subscribe(() => {
      this.loadAllDoctors();
      $('#AddDoctor').modal('hide');
    })
  }

  // Update doctor
  onUpdate(f: NgForm,doctor) {
    console.log('doctor last:',doctor);
    f.value.adress = {
      city : f.value.city,
      street : f.value.street,
      zip : f.value.zip
    }
    f.value.man = f.value.sexe;
    delete f.value.city;
    delete f.value.street;
    delete f.value.zip;
    delete f.value.sexe;
    delete f.value._id;
    this.admin.updateDoctor(doctor).subscribe(() => {
      this.loadAllDoctors();
      $('#AddDoctor').modal('hide');
    })
  }

  updateDoctor(doctor) {
    console.log('doctor:',doctor);
    this.doc_id = doctor._id;
    this.doctor = doctor;
    console.log('doctor:',this.doctor);
    $('#AddDoctor').css({
      'overflow-x': 'hidden',
      'overflow-y': 'auto'
    })
    this.modify = true;
  }

}
