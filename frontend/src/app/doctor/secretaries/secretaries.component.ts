import { Component, OnInit } from '@angular/core';
import { secretary } from '../../secretary.model';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm} from '@angular/forms';
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

  searchSecretary;
  modify = false;
  ngOnInit(): void {
  }

   onSubmit(f: NgForm) {
    console.log(f.value); 
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      // this.doctor.addSecretary(f.value,this.id_doctor).subscribe(() => {
      //   $('#addSecretary').modal('hide');
      // })
    });
   
  }

}
