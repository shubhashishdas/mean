import { Injectable, EventEmitter } from "@angular/core";
import { Company } from "../models/Company";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private baseUrl = environment.baseUrl;
    company: Company[] = [];
    companyModified = new EventEmitter<{ totalRecords: number, companies: Company[] }>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getCompanyList(currentPage: number, pageSize: number) {
        const queryParams = `?pageSize=${pageSize}&page=${currentPage}`;
        this.http.get(`${this.baseUrl}companies` + queryParams)
            .pipe(
                map((response: { isSuccess: boolean, totalRecords: number, data: Company[] }) => {
                    return {
                        companies: response.data.map((company: any) => {
                            return {
                                id: company._id,
                                companyName: company.companyName,
                                address: company.address,
                                imagePath: company.imagePath
                            }
                        }),
                        totalRecords: response.totalRecords
                    };
                })
            )
            .subscribe((data: any) => {
                this.company = data.companies;
                this.companyModified.emit(
                    {
                        totalRecords: data.totalRecords,
                        companies: [...this.company]
                    }
                );
            });
    }

    getCompany(id: string) {
        return this.http.get('http://localhost:3000/api/companies/' + id)
    }

    addCompany(companyObject) {
        this.http.post(`${this.baseUrl}companies/add`, companyObject)
            .subscribe((response: any) => {
                if (response.isSuccess) {
                    this.router.navigate(['/']);
                }
            });
    }

    udpateCompany(companyObject) {
        this.http.put(`${this.baseUrl}companies/` + companyObject.id, companyObject)
            .subscribe((response: any) => {
                if (response.isSuccess) {
                    this.router.navigate(['/']);
                }
            });
    }

    deleteCompany(companyId: string) {
        return this.http.delete(`${this.baseUrl}/companies/` + companyId);
    }
}