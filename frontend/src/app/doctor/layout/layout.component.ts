import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutDoctorComponent implements OnInit {

  routeSub;
  constructor(
    private doctor : DoctorService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  getDoctorById() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.doctor.getDoctorById(params['id']).subscribe((data: any) => {
        console.log('data:',data);
      })
    });
  }

}
