import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dog, DogToEdit} from "../../utils/interfaces";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {DogService} from "../../services/dog.service";
import {BREED_TO_IMG, BREEDS} from "../../utils/consts";

@Component({
  selector: 'app-all-dogs',
  templateUrl: './all-dogs.component.html',
  styleUrls: ['./all-dogs.component.css']
})
export class AllDogsComponent implements OnInit {
  dogs: DogToEdit[];
  isAdmin: boolean;
  BREEDS: string[] = BREEDS;
  dogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dogService: DogService,
    private userService: UserService,
    private router: Router
  ) {
    this.dogs = [];
    this.isAdmin = false;
    this.dogForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      lastVaccination: ['', Validators.required],
      hasBeenNeutered: [false],
      dateOfArrival: [new Date()],
      colour: ['', Validators.required],
      breed: ['', Validators.required],
      birthday: ['', Validators.required],
      sicknesses: []
    });
  }

  ngOnInit() {
    this.getDogs();
    this.userService.userObservable$.subscribe((user) => this.isAdmin = !!user.isAdmin);
  }

  getDogs(): void {
    this.dogService.getDogs().subscribe(dogs => this.dogs = dogs.map(dog => ({...dog, isEditing: false})));
  }

  editDog(dog: DogToEdit): void {
    dog.isEditing = true;
    this.dogForm.patchValue({
      name: dog.name,
      colour: dog.colour,
      breed: dog.breed,
      gender: dog.gender,
      birthday: dog.birthday,
      dateOfArrival: dog.dateOfArrival,
      lastVaccination: dog.lastVaccination,
      hasBeenNeutered: dog.hasBeenNeutered,
      sicknesses: dog.sicknesses.join(', ')
    });
  }

  saveDog(dog: DogToEdit): void {
    if (this.dogForm.valid) {
      const updatedDog: Dog = {
        ...dog,
        name: this.dogForm.value.name,
        colour: this.dogForm.value.colour,
        breed: this.dogForm.value.breed,
        gender: this.dogForm.value.gender,
        birthday: this.dogForm.value.birthday,
        dateOfArrival: this.dogForm.value.dateOfArrival,
        lastVaccination: this.dogForm.value.lastVaccination,
        hasBeenNeutered: this.dogForm.value.hasBeenNeutered,
        sicknesses: this.dogForm.value.sicknesses.split(',').map((sickness: string) => sickness.trim())
      };

      this.dogService.upsertDog({
        ...updatedDog,
        sicknesses: JSON.stringify(updatedDog.sicknesses)
      } as unknown as Dog).subscribe(() => {
        alert('הכלב עודכן בהצלחה');
        dog.isEditing = false;
        this.router.navigate(['/admin']);
      });
    }
  }

  calculateDogAge(birthday: Date): string {
    return this.dogService.calculateDogAge(birthday);
  }

  getDogImagePath(breed: string): string | undefined {
    return BREED_TO_IMG.get(breed);
  }

  cancelEdit(dog: DogToEdit): void {
    dog.isEditing = false;
  }
}
