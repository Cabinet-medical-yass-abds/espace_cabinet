import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { claim } from 'src/app/claim.model';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  constructor(private admin:AdminService) { }

  claims : claim [];
  searchClaim;
  emptyBool;
  ngOnInit(): void {
    this.loadAllClaims();
  }

  loadAllClaims() {
    this.admin.getAllClaims().subscribe((data: claim []) => {
      this.claims = data;
      console.log('Claims:',data);
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  

}
