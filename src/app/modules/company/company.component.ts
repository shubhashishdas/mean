import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CompanyService } from "../../services/company.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    companyForm: FormGroup

    constructor(
        private companyService: CompanyService
    ) {

    }

    ngOnInit() {
        this.createCompanyForm();

    }

    createCompanyForm() {
        this.companyForm = new FormGroup({
            companyName: new FormControl(),
            address: new FormControl()
        })
    }

    addCompany() {
        console.log(this.companyForm.value);
        this.companyService.addCompany({ companyName: this.companyForm.get('companyName').value, address: this.companyForm.get('address').value })
    }
}