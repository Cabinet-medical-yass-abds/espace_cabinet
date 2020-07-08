import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SecretaryService} from '../secretary.service';
declare var $: any;

@Component({
  selector: 'app-home-sec',
  templateUrl: './home-sec.component.html',
  styleUrls: ['./home-sec.component.css']
})
export class HomeSecComponent implements OnInit {

  constructor(private sec : SecretaryService) { }
  Secretary;
  myid;
  ngOnInit(): void {
    this.Secretary =  JSON.parse(localStorage.getItem('secretary')); 
    this.myid = this.Secretary._id; 
  }

  
  updateProfile(myid , f: NgForm ){
    console.log(myid)
    console.log(f.value)
    /* if (f.value.password == '') {
      f.value.password = this.Secretary.password
    } */
    this.sec.UpdateSec(myid, f.value).subscribe((data : any)=>{
      console.log(data)
      localStorage.setItem('secretary', JSON.stringify(data));
      $('#updateSec').modal('hide');
    })
  }
}
