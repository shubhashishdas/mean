import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyListComponent } from "./modules/company-list/company-list.component";
import { CompanyComponent } from "./modules/company/company.component";
import { SignupComponent } from "./modules/signup/signup.component";
import { SignInComponent } from "./modules/sign-in/sign-in.component";
import { AuthGaurd } from "./common/auth/auth.gaurd";

const appRoutes: Routes = [
    { path: '', component: CompanyListComponent, canActivate: [AuthGaurd] },
    { path: 'add', component: CompanyComponent, canActivate: [AuthGaurd] },
    { path: 'edit/:id', component: CompanyComponent, canActivate: [AuthGaurd] },
    { path: 'sign-in', component: SignInComponent },
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