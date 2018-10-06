import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  constructor(
    private companyService: CompanyService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.companyService.companyModified.subscribe(result => {
      this.companies = result;
    });
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.getCompanyList();
  }

  onDelete(companyId: string) {
    this.companyService.deleteCompany(companyId);
  }

}
