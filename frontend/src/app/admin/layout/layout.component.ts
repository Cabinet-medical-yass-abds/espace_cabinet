import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      console.log('im here');
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
}
