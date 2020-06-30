import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { secretary } from '../../secretary.model';
import {NgForm} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.css']
})
export class SecretariesComponent implements OnInit {

  constructor(private admin:AdminService) { }

  secretaries : secretary [];
  searchSecretary;
  secretary;
  emptyBool;
  modify = false;

  ngOnInit(): void {
    this.loadAllSecretaries();
  }

  loadAllSecretaries() {
    this.admin.getAllSecretaries().subscribe((data: secretary []) => {
      this.secretaries = data;
      console.log('secretaries:',data);
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    f.value.nom = f.value.name;
    f.value.prenom = f.value.fname;
    delete f.value.fname;
    delete f.value.name;
    this.admin.addSecretary(f.value).subscribe(() => {
      this.loadAllSecretaries();
      $('#addSecretary').modal('hide');
    })
  }
  onUpdate(f: NgForm,secretary) {
    console.log('secretary;',secretary);
    this.admin.updateSecretary(secretary).subscribe(() => {
      this.loadAllSecretaries();
      $('#addSecretary').modal('hide');
    })
  }

   // Delete secretary by id
  deleteD(id) {
    this.admin.deleteSecretary(id).subscribe(() => {
      this.loadAllSecretaries();
    })
  }
  updateSecretary(secretary) {
    console.log('secretary:',secretary);
    this.secretary = secretary;
    this.modify = true;
  }

}
