import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.baseUrl;
    private token: string;
    private isLoggedIn$ = new BehaviorSubject<boolean>(false);
    private expiresIn: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signup(postData: User) {
        return this.http.post(`${this.baseUrl}auth/signup`, postData);
    }

    singin(postData: { email: string, password: string }) {
        this.http.post(`${this.baseUrl}auth/signin`, postData).subscribe(
            (result: { isSuccess: boolean, token: string, expiresIn: number }) => {
                if (result.isSuccess) {
                    this.createSession(result.token, result.expiresIn);
                    this.router.navigate(['/']);
                }
            },
            () => {
                console.log('Final call');
            }
        );;
    }

    logout() {
        this.clearSession();
        this.router.navigate(['/sign-in']);
    }

    getToken() {
        return this.token;
    }

    checkOnPageLoad() {
        let token = localStorage.getItem('token');
        let expiresIn = localStorage.getItem('expiresIn');
        if (token && expiresIn) {
            this.token = token;
            this.expiresIn = expiresIn;
            this.isLoggedIn$.next(true);
        } else {
            this.clearSession();
        }
    }

    createSession(token: string, expiresIn: number) {
        this.token = token;
        this.isLoggedIn$.next(true);
        this.expiresIn = expiresIn;
        localStorage.setItem('token', this.token);
        localStorage.setItem('expiresIn', this.expiresIn);
    }

    clearSession() {
        this.token = '';
        this.isLoggedIn$.next(false);
        this.expiresIn = 0;
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }

    isAuthentiacate() {
        return this.isLoggedIn$.asObservable();
    }
}