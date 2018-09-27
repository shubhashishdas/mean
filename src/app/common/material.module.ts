import { NgModule } from "@angular/core";
import { MatToolbarModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule } from '@angular/material';
const Modules = [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
]
@NgModule({
    imports: [
        Modules
    ],
    exports: [
        Modules
    ],
    declarations: [],
})
export class MaterialModules { }