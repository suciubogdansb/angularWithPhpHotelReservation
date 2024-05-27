import { Component } from '@angular/core';
import {GenericService} from "../../generic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent {
  today = new Date();
  startDate = new FormControl(this.today);
  endDate = new FormControl(this.today);

  constructor(
    private service: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if(this.route.snapshot.queryParams['id'] === null) {
      this.redirectToMain();
    }
  }
  redirectToMain() {
    this.router.navigate(['/show']).then((_) => { });
  }

  addReservation() {
    const userId = sessionStorage.getItem('userId');
    const roomNumber = this.route.snapshot.queryParams['id'];
    if (this.startDate.value == null || this.endDate.value == null) {
      return;
    }
    this.service.addReservation(Number(userId), Number(roomNumber), this.startDate.value?.toString(), this.endDate.value?.toString())
      .subscribe({
        next: (data) => {
          console.log(data);
          this.redirectToMain();
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
