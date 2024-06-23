import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {Treatment, User} from "../app/components/models/models";
import {Status} from "../utils/enums";
import {ToastrService} from "ngx-toastr";

const SERVER_ADDRESS: string = `http://localhost:4000`;
const FICTITIOUS_USER: User = {
  id: 0,
  speciality: "",
  status: Status.INACTIVE,
  firstName: "Guest",
  lastName: "",
  username: "",
  password: ""
}
const POLLING_CONSTANT: number = 30000;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user: User;
  userSubject = new BehaviorSubject<User>(FICTITIOUS_USER);

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.pollServer();
  }

  pollServer(): void {
    setInterval(() => this.pollUser(), POLLING_CONSTANT);
  }

  pollUser(): void {
    if (this.user.id) {
      console.log('Seeking activation...');
      this.getUserById(this.user.id).subscribe(userFromServer => {
        if (this.user.status == Status.INACTIVE && userFromServer.status == Status.ACTIVE) {
          console.log('Found activation!');
          this.getLastTreatmentByUserId(this.user.id).subscribe((relevantTreatment: Treatment) => {
            this.toastr.info(`Room: ${relevantTreatment.room.roomNumber}, Patient: ${relevantTreatment.patient.firstName} ${relevantTreatment.patient.lastName}`, 'New Treatment Assigned!');
          })
        }
        this.user = userFromServer;
        this.userSubject.next(userFromServer);
      });
    }
  }

  getUsers(): Observable<any> {
    return this.http.get(`${SERVER_ADDRESS}/users`);
  }

  getTreatments(): Observable<any> {
    return this.http.get(`${SERVER_ADDRESS}/treatments`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${SERVER_ADDRESS}/users/${id}`);
  }

  getLastTreatmentByUserId(userId: number): Observable<any> {
    return this.http.get(`${SERVER_ADDRESS}/treatments/${userId}`);
  }

  setUser(user: User): Observable<User> {
    const userObservable: Observable<User> = <Observable<User>>this.http.post(`${SERVER_ADDRESS}/users`, user);
    userObservable.subscribe(user => this.userSubject.next(<User>user));
    return userObservable;
  }

  toggleActivation(userId: number, currentStatus: Status): Observable<User> {
    let action;
    if (currentStatus == Status.INACTIVE) {
      action = 'activate';
    } else if (currentStatus == Status.ACTIVE) {
      action = 'deactivate';
    }
    return <Observable<User>>this.http.post(`${SERVER_ADDRESS}/users/${action}/${userId}`, {});
  }

  login(username: string, password: string): void {
    this.http.post(`${SERVER_ADDRESS}/login`, {username, password}).subscribe(user => {
      if ((<User>user)?.id) {
        this.user = <User>user;
        this.userSubject.next(<User>user);
        this.router.navigate(['/treatments']);
      } else {
        this.toastr.error('Credentials invalid...', 'Login error!')
      }
    });
  }

  logout(): void {
    this.userSubject.next(FICTITIOUS_USER);
    this.router.navigate(['/login']);
  }
}
