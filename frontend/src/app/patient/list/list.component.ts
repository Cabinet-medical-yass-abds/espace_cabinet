import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import {patient} from '../patient.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  

  constructor(private patientService : PatientService ,private router : Router) { }
  pa : patient []
  
  ngOnInit() {
    this.binddata()
  }

  binddata() {
    this.patientService.getPatient().subscribe((data : patient[]) => {
      this.pa = data
     });
  }

 
  
  deletepatient(id) {
    this.patientService.deletePatient(id).subscribe(() => {
      this.binddata();
    });
  }

}
