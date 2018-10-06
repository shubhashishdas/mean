import { NgModule } from "@angular/core";
import { MatToolbarModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatProgressBarModule, MatPaginatorModule } from '@angular/material';
const Modules = [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatPaginatorModule
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