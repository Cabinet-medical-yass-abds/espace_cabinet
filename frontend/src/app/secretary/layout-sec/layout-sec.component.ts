import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-layout-sec',
  templateUrl: './layout-sec.component.html',
  styleUrls: ['./layout-sec.component.css']
})
export class LayoutSecComponent implements OnInit {

  constructor() { }
  Secretary;
  name;
  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      console.log('im here');
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.Secretary =  JSON.parse(localStorage.getItem('secretary'));  
    this.name = this.Secretary.nom;
  }

}
