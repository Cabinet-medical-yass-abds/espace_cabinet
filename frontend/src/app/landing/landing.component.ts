import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  emailAdmin = 'admin@cabinet.tn';
  passwordAdmin = 'admin';
  alertMessageAdmin = '';
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

}
