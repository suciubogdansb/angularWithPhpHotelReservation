import { Component } from '@angular/core';
import {Room} from "../../data/Room";
import {GenericService} from "../../generic.service";
import {Router} from "@angular/router";
import {Reservation} from "../../data/Reservation";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css'
})
export class ReservationPageComponent {
  reservations: Reservation[] = []

  constructor(
    private service: GenericService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.refreshReservations();
  }

  refreshReservations() {
    this.service.getReservations()
      .subscribe({
        next: (reservations) => {
          this.reservations = [];
          reservations.forEach((reservation) => {
            this.reservations.push(reservation);
          });
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  redirectToMain() {
    this.router.navigate(['/show']).then((_) => { });
  }

  deleteReservation(reservation: number) {
    this.service.cancelReservation(reservation)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.refreshReservations();
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
