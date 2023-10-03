import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dog, Adoption, Drive} from '../utils/interfaces';
import queryString from 'query-string';
import {DOG_SERVER_URL} from "../utils/consts";
import {map} from "rxjs/operators";

const DOG_FACT_URL = 'https://dog-api.kinduff.com/api/facts';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private http: HttpClient) {
  }

  calculateDogAge(birthday: Date): string {
    const today:Date = new Date();
    const birthdayDate:Date = new Date(birthday);
    const ageInMilliseconds:number = today.getTime() - birthdayDate.getTime();
    return `${Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365))}`
  }

  getDogs(options?: Partial<Dog>): Observable<Dog[]> {
    return this.http.post<Dog[]>(`${DOG_SERVER_URL}/getDogs?${queryString.stringify(options ?? {})}`, {});
  }

  getDogsToVaccinate(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${DOG_SERVER_URL}/getDogsToVaccinate`);
  }

  upsertDog(dog: Dog): Observable<Dog> {
    return this.http.post<Dog>(`${DOG_SERVER_URL}/upsertDog?${queryString.stringify(dog)}`, {});
  }

  requestAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.post<Adoption>(`${DOG_SERVER_URL}/upsertAdoption?${queryString.stringify(adoption)}`, {});
  }

  getDrives(): Observable<Drive[]> {
    return this.http.get<Drive[]>(`${DOG_SERVER_URL}/getDrives`);
  }

  upsertDrive(drive: Drive): Observable<Drive> {
    return this.http.post<Drive>(`${DOG_SERVER_URL}/upsertDrive?${queryString.stringify(drive)}`, {});
  }

  claimDrive(id: number, userId: number): Observable<boolean> {
    return this.http.post<boolean>(`${DOG_SERVER_URL}/claimDrive/${id}/${userId}`, {});
  }

  deleteDrive(id: number): Observable<Drive> {
    return this.http.delete<Drive>(`${DOG_SERVER_URL}/deleteDrive/${id}`, {});
  }

  getRandomFact(): Observable<string> {
    return this.http.get<{ facts: string[], success: boolean }>(DOG_FACT_URL)
      .pipe(map(response => response.facts[0]));
  }
}
