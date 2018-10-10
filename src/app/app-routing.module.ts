import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyListComponent } from "./modules/company-list/company-list.component";
import { CompanyComponent } from "./modules/company/company.component";
import { SignupComponent } from "./modules/signup/signup.component";
import { SignInComponent } from "./modules/sign-in/sign-in.component";

const appRoutes: Routes = [
    { path: '', component: CompanyListComponent },
    { path: 'add', component: CompanyComponent },
    { path: 'edit/:id', component: CompanyComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
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