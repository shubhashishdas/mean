import { NgModule } from "@angular/core";
import { MatToolbarModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatProgressBarModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
const Modules = [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule
]
@NgModule({
    /* imports: [
        Modules
    ], */
    exports: [
        Modules
    ],
})
export class MaterialModules { }