import { Injectable, EventEmitter } from "@angular/core";
import { Company } from "../models/Company";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    company: Company[] = [];
    companyModified = new EventEmitter<Company[]>();

    constructor(
        private http: HttpClient
    ) {
        console.log('In company service');
    }

    getCompanyList() {
        console.log('In get company function');

        this.http.get('http://localhost:3000/api/companies').subscribe((response: any) => {
            this.company = response.data;
            this.companyModified.emit(this.company);
        });
    }

    addCompany(companyObject) {
        const post = { id: null, ...companyObject };
        this.http.post('http://localhost:3000/api/companies/add', post).subscribe((response) => {
            this.company.push(post);
            this.companyModified.emit(this.company);
        });
    }
}