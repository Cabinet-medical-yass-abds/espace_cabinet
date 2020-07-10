import { Component, OnInit } from '@angular/core';
import { consultation } from 'src/app/consultation.model';
import { DoctorService } from '../doctor.service';
import { doctor } from 'src/app/doctor.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  constructor(private doctor:DoctorService,private formBuilder: FormBuilder) { }

  myDoctor: doctor;
  myConsultations: consultation [];
  id_doctor;
  id_const;
  myFile :any;
  uploadForm: FormGroup; 
  formData = new FormData();

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    }); 
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
  // Get consultation Id 
  getConstId(id_cons) {
    console.log('id_cons:',id_cons);
    this.id_const = id_cons;
  }

  onFileSelected(event) {
    console.log('event.target.files[0]:',event.target.files[0]);
    this.myFile = event.target.files[0];
    this.uploadForm.get('file').setValue(this.myFile);
  }
  onSubmit(id_const) {
    console.log(' this.uploadForm:', this.uploadForm.get('file').value);
    this.formData.append('file', this.uploadForm.get('file').value);
    this.doctor.AddfileConsultation(this.formData,id_const).subscribe(() => {
      this.loadAllConsultations();
      $('#Addfile').modal('hide');
    });
  }

}
