import { Injectable, EventEmitter } from "@angular/core";
import { Company } from "../models/Company";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    company: Company[] = [];
    companyModified = new EventEmitter<{ totalRecords: number, companies: Company[] }>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getCompanyList(currentPage: number, pageSize: number) {
        const queryParams = `?pageSize=${pageSize}&page=${currentPage}`;
        this.http.get('http://localhost:3000/api/companies' + queryParams)
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
            }, error => {
                console.log('Something went wrong');
            });
    }

    getCompany(id: string) {
        return this.http.get('http://localhost:3000/api/companies/' + id)
    }

    addCompany(companyObject) {
        let postData = new FormData();
        postData.append('id', null);
        postData.append('companyName', companyObject.companyName);
        postData.append('address', companyObject.address);
        postData.append('image', companyObject.image);

        this.http.post('http://localhost:3000/api/companies/add', postData)
            .subscribe((response: any) => {
                if (response.isSuccess) {
                    this.router.navigate(['/']);
                }
            }, error => {
                console.log('Something went wrong');
            });
    }

    udpateCompany(companyObject) {
        let postData: Company | FormData;
        if (companyObject.image !== null && typeof companyObject.image === 'object') {
            postData = new FormData();
            postData.append('id', companyObject.id);
            postData.append('companyName', companyObject.companyName);
            postData.append('address', companyObject.address);
            postData.append('image', companyObject.image);
        } else {
            postData = { ...companyObject, imagePath: companyObject.image };
        }
        this.http.put('http://localhost:3000/api/companies/' + companyObject.id, postData)
            .subscribe((response: any) => {
                if (response.isSuccess) {
                    console.log(response);
                    this.router.navigate(['/']);
                }
            }, error => {
                console.log('Something went wrong');
            });
    }

    deleteCompany(companyId: string) {
        console.log('In delete company function');
        return this.http.delete('http://localhost:3000/api/companies/' + companyId);
    }
}