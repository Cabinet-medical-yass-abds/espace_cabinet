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

   // Click to show doctor informations 
   SecretaryInfo(Secretary) {
    this.mySecretary = Secretary;
    console.log('this.mySecretary:',this.mySecretary);
  }

  hire(sec_id , id_doc){
    this.doctor.hireSecrt(sec_id  , id_doc).subscribe(()=>{
      this.loadAllSecretaries();
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
