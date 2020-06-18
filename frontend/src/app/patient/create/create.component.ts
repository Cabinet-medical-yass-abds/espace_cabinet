import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private patientService : PatientService,private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      nom: '',
      prenom : '',
      email: '',
      password: ''
    });
  }

  addpatient(nom, prenom, email, password) {
    this.patientService.addPatient(nom, prenom, email, password).subscribe(() => {
      this.router.navigate(['/patientsList']);
    });
  }

  ngOnInit(): void {
  }

}
