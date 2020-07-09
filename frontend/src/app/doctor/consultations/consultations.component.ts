import { Component, OnInit } from '@angular/core';
import { consultation } from 'src/app/consultation.model';
import { DoctorService } from '../doctor.service';
import { doctor } from 'src/app/doctor.model';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  constructor(private doctor:DoctorService) { }

  myDoctor: doctor;
  myConsultations: consultation [];
  id_doctor;

  ngOnInit(): void {
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.id_doctor = this.myDoctor._id;
    this.loadAllConsultations();
  }

  

  //Get consultations ( not archived )
  loadAllConsultations() {
    this.doctor.getAllConsultations(this.id_doctor).subscribe((data: consultation []) => {
      console.log('dataaa consultations :',data);
      this.myConsultations = data;
    });
  }

  // Archive consultation 
  archive(id_consultation) {
    console.log('id_consultation',id_consultation);
    this.doctor.archiveConsultation(id_consultation).subscribe(() => {
      this.loadAllConsultations();
    });
  }

}
