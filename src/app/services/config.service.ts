import { Injectable, EventEmitter } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public isLoading = new EventEmitter<boolean>();
}