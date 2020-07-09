import { Component, OnInit } from '@angular/core';
import { secretary } from '../../secretary.model';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm} from '@angular/forms';
import { doctor } from 'src/app/doctor.model';
declare var $: any;

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.css']
})
export class SecretariesDoctorComponent implements OnInit {

  constructor(
    private doctor:DoctorService,
    private route: ActivatedRoute,
    private router: Router) { }

  secretaries : secretary [];
  searchSecretary;
  modify = false;
  emptyBool;
  mySecretary: secretary;
  myDoctor: doctor;
  doc_id;

  ngOnInit(): void {
    this.loadAllSecretaries();
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.doc_id = this.myDoctor._id;
    this.getDoctorById();
  }

  loadAllSecretaries() { 
    this.doctor.listSecWitoutDoc().subscribe((data: secretary []) => {
      this.secretaries = data;
      console.log('secretaries:',data);
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }
  getDoctorById() {
    this.doctor.getDoctorById(this.doc_id).subscribe((data: any) => {
      console.log('data:',data);
      localStorage.setItem('doctor', JSON.stringify(data)); 
    })
  }

   // Click to show secretary informations 
   SecretaryInfo(Secretary) {
    this.mySecretary = Secretary;
    console.log('this.mySecretary:',this.mySecretary);
  }

  hire(sec_id , id_doc){
    this.doctor.hireSecrt(sec_id  , id_doc).subscribe(()=>{
      this.getDoctorById();
      this.loadAllSecretaries();
      window.location.reload();
    });
  }
  unhire(sec_id,id_doc){
    this.doctor.unhireSecrt(sec_id  , id_doc).subscribe(()=>{
      this.getDoctorById();
      this.myDoctor.id_secrt = null;
      this.loadAllSecretaries();
      // window.location.reload();
    });
  }


  /*  onSubmit(f: NgForm) {
    console.log(f.value); 
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      // this.doctor.addSecretary(f.value,this.id_doctor).subscribe(() => {
      //   $('#addSecretary').modal('hide');
      // })
    });
  } */

}
