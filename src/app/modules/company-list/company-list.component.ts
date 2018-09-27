import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyService.companyModified.subscribe(result => { this.companies = result; console.log(result); });
  }

}
