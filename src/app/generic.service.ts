import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Room} from "./data/Room";
import {Reservation} from "./data/Reservation";

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  private backendUrl = 'http://localhost:5099/'

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    username = username.trim();
    const postLink = this.backendUrl + 'User/login';
    return this.http.post(postLink, {'username': username, 'password': password});
  }

  getRooms(price: number | null, type: string | null) {
    return this.http.get<Room[]>(this.backendUrl + 'api/Room' + '?price=' + (price ?? '') + '&type=' + (type ?? ''));
  }

  getReservations() {
    const userId = sessionStorage.getItem('userId');
    return this.http.get<Reservation[]>(this.backendUrl + 'Reservation/' + userId);
  }

  addReservation(userId: number, roomNumber: number, startDate: string, endDate: string) {
    const postLink = this.backendUrl + 'Reservation';
    return this.http.post(postLink,
      {
        'userId': userId,
        'roomNumber': roomNumber,
        'startDate': startDate,
        'endDate': endDate
      }
    );
  }

  cancelReservation(reservation: number) {
    return this.http.delete(this.backendUrl + 'Reservation/' + reservation);
  }

  register(username: string, password: string) {
    const postLink = this.backendUrl + 'User/authenticate'
    return this.http.post(postLink,
      {
        'username': username,
        'password': password
      }
    )
  }
}
