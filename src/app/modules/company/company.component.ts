import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ConfigService } from "../../services/config.service";
import { mimeType } from '../../common/mime-type.validator';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    companyForm: FormGroup;
    companyId: string;
    mode: string;
    imagePreview: any;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private configService: ConfigService
    ) {

        this.route.params.subscribe((params: ParamMap) => {
            if (params.hasOwnProperty('id')) {
                this.mode = 'edit';
                this.companyId = params['id'];
                this.companyService.getCompany(this.companyId).subscribe((response: any) => {
                    if (response.isSuccess) {
                        this.companyForm.patchValue({
                            id: response.data._id,
                            companyName: response.data.companyName,
                            address: response.data.address
                        });
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
            companyName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            address: new FormControl(null),
            // image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
            // image: new FormControl(null)
        })
    }

    addCompany() {
        if (this.companyForm.invalid) {
            return;
        }
        if (this.mode == 'add') {
            this.companyService.addCompany(this.companyForm.value);
        } else {
            this.companyService.udpateCompany(this.companyForm.value);
        }
        this.companyForm.reset();
    }

    fileUpload(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.companyForm.patchValue({ image: file });
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(file);
        this.companyForm.get('image').updateValueAndValidity();
    }
}