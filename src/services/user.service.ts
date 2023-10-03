import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Adoption, User} from "../utils/interfaces";
import {HttpClient} from "@angular/common/http";
import {DOG_SERVER_URL, FICTITIOUS_USER} from "../utils/consts";
import queryString from 'query-string';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public userObservable$: Observable<User>;
  public user!: User;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(FICTITIOUS_USER);
    this.userObservable$ = this.userSubject.asObservable();
    this.userObservable$.subscribe((user: User) => this.user = user);
  }

  login(username: string, password: string): void {
    this.http.get<User>(`${DOG_SERVER_URL}/login/${username}/${password}`, {}).subscribe((user: User) => {
      if (user?.id) {
        this.userSubject.next(user);
        this.router.navigate(['/dashboard']);
      } else {
        alert("שגיאה בהתחברות!");
      }
    });
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${DOG_SERVER_URL}/upsertUser?${queryString.stringify(user)}`, {});
  }

  editUser(user: any): Observable<User> {
    let userToAdd: any = {};
    Object.keys(user).filter(key => user[key] != '').forEach(relevantKey => userToAdd[relevantKey] = user[relevantKey]);
    this.userSubject.next({...this.user, firstName: user.firstName !== '' ? user.firstName : this.user.firstName});
    return this.http.post<User>(`${DOG_SERVER_URL}/upsertUser?${queryString.stringify({
      ...userToAdd,
      id: this.user.id
    })}`, {});
  }

  logout(): void {
    this.userSubject.next(FICTITIOUS_USER);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${DOG_SERVER_URL}/getUsers`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${DOG_SERVER_URL}/getUserById/${id}`);
  }

  getPendingAdoptionApplications(): Observable<Adoption[]> {
    return this.http.get<Adoption[]>(`${DOG_SERVER_URL}/pendingAdoptionApplications`);
  }

  approveAdoption(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${DOG_SERVER_URL}/adoptDog/${id}`, {});
  }

  rejectAdoption(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${DOG_SERVER_URL}/deleteAdoption/${id}`, {});
  }
}
