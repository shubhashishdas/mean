import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ConfigService } from "../../services/config.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    companyForm: FormGroup;
    companyId: string;
    mode: string;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private configService: ConfigService
    ) {

        this.route.params.subscribe((params: ParamMap) => {
            if (params.hasOwnProperty('id')) {
                this.configService.isLoading.next(true);
                this.mode = 'edit';
                this.companyId = params['id'];
                this.companyService.getCompany(this.companyId).subscribe((response: any) => {
                    if (response.isSuccess) {
                        this.companyForm.patchValue({
                            id: response.data._id,
                            companyName: response.data.companyName,
                            address: response.data.address
                        });
                        this.configService.isLoading.next(false);
                    }
                });;
            } else {
                this.mode = 'add';
                this.companyId = null;
            }

        })
    }

    ngOnInit() {
        this.createCompanyForm();
    }

    createCompanyForm() {
        this.companyForm = new FormGroup({
            id: new FormControl(null),
            companyName: new FormControl(),
            address: new FormControl()
        })
    }

    addCompany() {
        this.configService.isLoading.next(true);
        if (this.mode == 'add') {
            this.companyService.addCompany({ companyName: this.companyForm.get('companyName').value, address: this.companyForm.get('address').value })
        } else {
            this.companyService.udpateCompany(this.companyForm.value);
        }
        this.companyForm.reset();
    }
}