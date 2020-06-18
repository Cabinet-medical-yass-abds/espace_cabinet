import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/patient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  createForm: FormGroup;
  public id :string;

  constructor(private patientService : PatientService,private fb: FormBuilder, private router: Router ,private route: ActivatedRoute) {
    this.createForm = this.fb.group({
      nom: '',
      prenom : '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id  
    })
  }

  updatepatient(nom, prenom, email, password) {
    this.patientService.updatePatient(this.id,nom, prenom, email, password).subscribe(() => {
      this.router.navigate(['/patientsList']);
    });
  }


}
