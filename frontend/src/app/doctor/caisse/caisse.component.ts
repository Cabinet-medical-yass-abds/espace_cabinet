import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../doctor.service';

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
  getCaissePerdate(id,f : NgForm ){
    this.doctor.listPayment(id , f.value).subscribe((data : any)=>{
      console.log(data)
      /* this.somme = 0 ;
      data.forEach(element => {
        this.somme += element.id_appointment.prix
      }); */
    })
  }
}
