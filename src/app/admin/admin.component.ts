import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dog, Adoption, User} from "../../utils/interfaces";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {DogService} from "../../services/dog.service";
import {BREEDS} from "../../utils/consts";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminPageComponent implements OnInit {
  users: User[];
  pendingAdoptionApplications: Adoption[];
  addDogForm: FormGroup;
  dogs: Dog[];
  dogSicknesses: string[] = [];

  constructor(
    private dogService: DogService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.users = [];
    this.pendingAdoptionApplications = [];
    this.dogs = [];
    this.addDogForm = this.formBuilder.group({
      name: ['', Validators.required],
      colour: ['', Validators.compose([Validators.required, Validators.max(30)])],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      dateOfArrival: [new Date()],
      lastVaccination: ['', Validators.required],
      hasBeenNeutered: [false],
      sicknesses: []
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
    this.userService.getPendingAdoptionApplications().subscribe((applications: Adoption[]) => this.pendingAdoptionApplications = applications);
    this.dogService.getDogs().subscribe((dogs: Dog[]) => this.dogs = dogs);
  }

  approveAdoptionApplication(dogId: number): void {
    this.userService.approveAdoption(dogId).subscribe(() => {
      alert(`האימוץ אושר בהצלחה`);
      return this.pendingAdoptionApplications = this.pendingAdoptionApplications.filter(application => application.dogId !== dogId);
    });
  }

  rejectAdoptionApplication(id: number): void {
    this.userService.rejectAdoption(id).subscribe(() => {
      alert(`האימוץ נדחה בהצלחה`);
      return this.pendingAdoptionApplications = this.pendingAdoptionApplications.filter(application => application.id !== id);
    });
  }

  addDog(): void {
    const newDog: Dog = {...this.addDogForm.value, sicknesses: JSON.stringify(this.dogSicknesses)} as Dog;
    this.dogService.upsertDog(newDog).subscribe((dog: Dog) => {
      alert(` הכלב ${dog.name} נוסף בהצלחה`);
      this.router.navigate(['/all-dogs']);
    });
  }

  addSickness(): void {
    const sickness = this.addDogForm.get('sicknesses')?.value;
    if (sickness) {
      this.dogSicknesses.push(sickness);
      this.addDogForm.get('sicknesses')?.reset();
    }
  }

  getDogName(dogId: number): string {
    return this.dogs.find((dog: Dog) => dog.id == dogId)?.name ?? '';
  }

  getRelevantUserFullName(userId: number): string {
    const index: number = this.users.findIndex((user: User) => user.id == userId);
    return `${this.users[index].firstName} ${this.users[index].lastName}`;
  }

  protected readonly BREEDS = BREEDS;
}
