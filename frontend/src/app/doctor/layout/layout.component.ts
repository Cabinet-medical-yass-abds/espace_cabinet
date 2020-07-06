import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { doctor } from 'src/app/doctor.model';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutDoctorComponent implements OnInit {

  routeSub;
  doctor_id;
  doctor_name;
  myDoctor: doctor;
  constructor(
    private doctor : DoctorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.doctor_name = this.myDoctor.nom;
  }
  logout() {
    localStorage.clear();
  }

  // getDoctorById() {
  //   this.route.params.subscribe(params => {
  //     console.log(params) //log the entire params object
  //     console.log(params['id']) //log the value of id
  //     this.doctor_id = params['id'];
  //     console.log('soorage name doctor',localStorage.getItem('doctor_name'));
  //     this.doctor.getDoctorById(this.doctor_id).subscribe((data: any) => {
  //       console.log('data:',data);
  //     })
  //   });
  // }

}
