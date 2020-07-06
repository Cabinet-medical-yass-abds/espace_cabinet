import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor/doctor.service';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router,private doctor : DoctorService) { }

  emailAdmin = 'admin@cabinet.tn';
  passwordAdmin = 'admin';
  alertMessageAdmin = '';
  alertMessageDoctor = '';
  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log('f.value',f.value);
    if (f.value.emailAdmin != this.emailAdmin) {
      this.alertMessageAdmin = 'Email est incorrecte';
    }else if (f.value.passwordAdmin != this.passwordAdmin) {
      this.alertMessageAdmin = 'Mot de passe est incorrecte';
    }else{
      $('#LoginAdmin').modal('hide');
      this.router.navigate(['admin/dashboard']);
    }
  }

  onSubmitDoctor(f: NgForm) {
    console.log('f.value',f.value);
    this.doctor.LoginDoctor(f.value).subscribe((data: any) => {
      console.log('data',data);
      if (data._id != undefined) {
        $('#LoginDoctor').modal('hide');
        localStorage.setItem('doctor_name',data.nom);
        this.router.navigate(['doctor/home/'+data._id]);
      }else {
        this.alertMessageDoctor = data;
      }
    })
  }

}
