import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {GenericService} from "../../generic.service";
import {Router} from "@angular/router";

interface LoginResponse{
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
  password = new FormControl('');
  show: boolean = false
  errorMessage: any = false

  constructor(
    private service: GenericService,
    private router: Router,
    ) {}

  login(){
    console.log(this.username.value);
    if (this.username.value === null || this.password.value === null) {
      this.errorMessage = "Please fill in all fields";
      return;
    }
    if (this.username.value === '' || this.password.value === '') {
      this.errorMessage = "Please fill in all fields";
      return;
    }
    this.service.login(this.username.value, this.password.value)
      .subscribe({
          next: (data) => {
            console.log(data);
            const loginResponse = data as LoginResponse;
            sessionStorage.setItem('userId', String(loginResponse.id));
            this.router.navigate(['/show']).then(_ => {});
          },
          error: (error) =>
          {
            console.log(error);
            this.errorMessage = error.statusText;
          }
        }
      );
  }

  redirectToRegister() {
    this.router.navigate(['/register']).then((_) => { });
  }

  changeType() {

  }
}
