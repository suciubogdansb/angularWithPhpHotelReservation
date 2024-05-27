import { Component } from '@angular/core';
import {Room} from "../../data/Room";
import {GenericService} from "../../generic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  rooms: Room[] = []

  constructor(
    private service: GenericService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.refreshRooms();
  }

  refreshRooms(price: number | null = null, type: string | null = null) {
    price = (price && price > 0)? price : null;
    this.service.getRooms(price, type)
      .subscribe({
        next: (rooms) => {
          this.rooms = [];
          rooms.forEach((room) => {
            this.rooms.push(room);
          });
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  redirectToReservation() {
    this.router.navigate(['/reservation']).then((_) => { });
  }

  reserveRoom(room: number) {
    this.router.navigate(['/add'], { queryParams: { id: room } }).then((_) => { });
  }
}
