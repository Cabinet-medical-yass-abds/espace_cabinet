import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../doctor.service';
declare var $: any;
@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  constructor(private doctor : DoctorService ) { }

  myDoctor;
  id_doc ;
  ngOnInit(): void {
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));
    this.id_doc = this.myDoctor._id
  }

  somme;
  dateD;
  dateF;
  getCaissePerdate(id,f : NgForm ){
    console.log('f.value',f.value);
    this.dateD = f.value.dateD+'T00:00:00.000+00:00';
    this.dateF = f.value.dateF+'T23:59:59.000+00:00';
    console.log('this.dateD:',this.dateD);
    console.log('this.dateF',this.dateF);
    this.doctor.listPayment(id , this.dateD,this.dateF).subscribe((data : any)=>{
      console.log(data)
      this.somme = 0 ;
      data.forEach(element => {
        this.somme += element.id_appointment.prix
      }); 
      console.log('somme:',this.somme);
    })
  }
}
