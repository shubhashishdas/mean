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
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  totalRecords: number = 0;
  constructor(
    private companyService: CompanyService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.companyService.companyModified.subscribe(result => {
      this.companies = result.companies;
      this.totalRecords = result.totalRecords;
    });
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.getCompanyList(this.currentPage, this.pageSize);
  }

  onDelete(companyId: string) {
    this.companyService.deleteCompany(companyId).subscribe((result: { isSuccess: boolean }) => {
      if (result.isSuccess) {
        this.companyService.getCompanyList(this.currentPage, this.pageSize);
      }
    });
  }

  pageChange(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.companyService.getCompanyList(this.currentPage, this.pageSize);
  }
}
