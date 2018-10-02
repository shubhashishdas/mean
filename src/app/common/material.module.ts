import { NgModule } from "@angular/core";
import { MatToolbarModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatProgressBarModule } from '@angular/material';
const Modules = [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule
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