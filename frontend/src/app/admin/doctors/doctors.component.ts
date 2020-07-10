import { Component, OnInit } from '@angular/core';
import { doctor } from '../../doctor.model';
import { AdminService } from '../admin.service';
import {NgForm} from '@angular/forms';
import { secretary } from 'src/app/secretary.model';
declare var $: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private admin:AdminService) {}

  ad : doctor [];
  secretaries : secretary [];
  doctor;
  searchDoctor;
  emptyBool;
  modify = false;
  doc_id;
  mydoctor: doctor;

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

  // Click to show doctor informations 
  doctorInfo(doctor) {
    this.mydoctor = doctor;
    console.log('this.mydoctor:',this.mydoctor);
  }

  // Delete doctor by id
  deleteD(id) {
    this.admin.deleteDoctor(id).subscribe(() => {
      this.loadAllDoctors();
    })
  }

  accept(id_doctor) {
    console.log('id_doctor:',id_doctor);
    this.admin.acceptDoctor(id_doctor).subscribe(() => {
      this.loadAllDoctors();
    })
  }

}
