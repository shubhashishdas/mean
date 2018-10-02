import { Injectable, EventEmitter } from "@angular/core";
import { Company } from "../models/Company";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    company: any[] = [];
    companyModified = new EventEmitter<Company[]>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        console.log('In company service');
    }

    getCompanyList() {
        this.http.get('http://localhost:3000/api/companies')
            .pipe(
                map((response: any) => {
                    return response.data.map(company => {
                        return {
                            id: company._id,
                            companyName: company.companyName,
                            address: company.address
                        }
                    })
                })
            )
            .subscribe((data: any) => {
                this.company = data;
                this.companyModified.emit(this.company);
            }, error => {
                console.log('Something went wrong');
            });
    }

    getCompany(id: string) {
        return this.http.get('http://localhost:3000/api/companies/' + id)
    }

    addCompany(companyObject) {
        const post = { id: null, ...companyObject };
        this.http.post('http://localhost:3000/api/companies/add', post)
            .subscribe((response: any) => {
                if (response.isSuccess) {
                    post.id = response.id;
                    this.company.push(post);
                    this.companyModified.emit(this.company);
                    this.router.navigate(['/']);
                }
            }, error => {
                console.log('Something went wrong');
            });
    }

    udpateCompany(companyObject) {
        console.log(companyObject);
        this.http.put('http://localhost:3000/api/companies/' + companyObject.id, companyObject)
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
        this.http.delete('http://localhost:3000/api/companies/' + companyId).subscribe((response) => {
            let updateData = this.company.filter(ele => ele.id != companyId);
            this.company = updateData;
            this.companyModified.emit([...this.company]);
        }, error => {
            console.log('Something went wrong');
        });
    }
}