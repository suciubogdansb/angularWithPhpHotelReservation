import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {GenericService} from "../../generic.service";
import {Router} from "@angular/router";

interface LoginResponse {
  id: number;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  title: string = "Login page"
  username = new FormControl('');

  constructor(
    private service: GenericService,
    private router: Router,
    ) {}

  login(){
    console.log(this.username.value);
    if (this.username.value === null) {
      return;
    }
      const data = this.service.login(this.username.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            const loginResponse = data as LoginResponse;
            sessionStorage.setItem('userId', String(loginResponse.id));
            this.router.navigate(['/show']);
          },
        error: (error) =>
          {
            console.log(error);
          }
        }
      )
  }
}
