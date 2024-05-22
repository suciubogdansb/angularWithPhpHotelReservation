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
  private backendUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  login(username: string){
    username = username.trim();
    const formData = new FormData();
    formData.append('username', username);
    const postLink = this.backendUrl+'loginBackend.php';
    return this.http.post(postLink, formData);
  }

  getRooms(price: number, type: string){
    return this.http.get<Room[]>(this.backendUrl+'showRoomsBackend.php?price='+price+'&type='+type);
  }

  getReservations(){
    const userId = sessionStorage.getItem('userId');
    return this.http.get<Reservation[]>(this.backendUrl+'showReservationBackend.php?userId='+userId);
  }

  addReservation(userId: number, roomNumber: number, startDate: string, endDate: string){
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('roomNumber', roomNumber.toString());
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    const postLink = this.backendUrl+'addReservationBackend.php';
    return this.http.post(postLink, formData);
  }

  cancelReservation(reservation: number) {
    return this.http.delete(this.backendUrl+'deleteReservation.php?id='+reservation);
  }
}
