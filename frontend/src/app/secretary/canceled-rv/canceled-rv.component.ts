import { Component, OnInit } from '@angular/core';
import { SecretaryService } from '../secretary.service';

@Component({
  selector: 'app-canceled-rv',
  templateUrl: './canceled-rv.component.html',
  styleUrls: ['./canceled-rv.component.css']
})
export class CanceledRVComponent implements OnInit {

  constructor(private sec : SecretaryService ) { }
  Secretary;
  myid;
  RV_id;
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
      this.myRV = data
    })
  }
  
}
