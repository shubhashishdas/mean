import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyListComponent } from "./modules/company-list/company-list.component";
import { CompanyComponent } from "./modules/company/company.component";

const appRoutes: Routes = [
    { path: '', component: CompanyListComponent },
    { path: 'add', component: CompanyComponent },
    { path: 'edit/:id', component: CompanyComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }