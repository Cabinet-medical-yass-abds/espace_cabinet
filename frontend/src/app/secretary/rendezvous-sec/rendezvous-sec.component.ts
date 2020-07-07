import { Component, OnInit } from '@angular/core';
import {SecretaryService} from '../secretary.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rendezvous-sec',
  templateUrl: './rendezvous-sec.component.html',
  styleUrls: ['./rendezvous-sec.component.css']
})
export class RendezvousSecComponent implements OnInit {

  constructor(private sec : SecretaryService) { }
  Secretary;
  myid;
  HerDocId;
  ngOnInit(): void {
    this.Secretary =  JSON.parse(localStorage.getItem('secretary'));  
    this.myid = this.Secretary._id;
    this.HerDocId = this.Secretary.id_doctor._id
    console.log(this.HerDocId)
    this.listOwnRv(this.HerDocId);
  }

  myRV;
  listOwnRv(HerDocId){
    this.sec.ListRv(HerDocId).subscribe((data: any)=>{
      console.log(data)
      //this.myRV = data
    })
  }

  OnSubmitAccept(id ,f: NgForm){
    this.sec.AcceptRV(id,f.value).subscribe((data : any)=>{
      console.log(data)
    })
  }

  Cancel(id){
    this.sec.CancelRV(id).subscribe((data : any)=>{
      console.log(data)
    })
  }

}
