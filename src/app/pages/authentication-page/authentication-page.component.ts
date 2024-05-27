import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {GenericService} from "../../generic.service";
import {Router} from "@angular/router";

interface RegisterResponse{
  id: number;
  username: string;
}

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css'
})
export class AuthenticationPageComponent {
  title: string = "Register"
  username = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  show: boolean = false
  errorMessage: any = false

  constructor(
    private service: GenericService,
    private router: Router,
    ) {}

  register() {
    if (this.username.value === null || this.password.value === null || this.confirmPassword.value === null) {
      this.errorMessage = "Please fill in all fields";
      return;
    }
    if (this.username.value === '' || this.password.value === '' || this.confirmPassword.value === '') {
      this.errorMessage = "Please fill in all fields";
      return;
    }
    if (this.password.value !== this.confirmPassword.value) {
      this.errorMessage = "Passwords do not match";
      return;
    }
    this.service.register(this.username.value, this.password.value)
      .subscribe({
          next: (data) => {
            this.errorMessage = false;
            console.log(data);
            const loginResponse = data as RegisterResponse;
            sessionStorage.setItem('userId', String(loginResponse.id));
            this.router.navigate(['/show']).then(_ => {});
          },
          error: (err) =>
          {
            // error(err.message());
            this.errorMessage = err.statusText;
          }
        }
      );
  }
  //
  // protected readonly error = error;
}
