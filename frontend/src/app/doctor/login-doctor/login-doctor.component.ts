import { Component, OnInit } from '@angular/core';
import { secretary } from '../../secretary.model';
import {NgForm} from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.css']
})
export class LoginDoctorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
