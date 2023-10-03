import {Component, OnInit} from '@angular/core';
import {Dog, User} from "../../utils/interfaces";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DogService} from "../../services/dog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  dogs: Dog[] = [];
  user!: User;
  adoptionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private dogService: DogService, private router: Router) {
  }

  ngOnInit(): void {
    this.adoptionForm = this.formBuilder.group({
      dogId: ['', Validators.required],
      adoptionDate: ['', Validators.required]
    }, {validator: this.dateComparisonValidator});
    this.dogService.getDogs().subscribe(dogs => this.dogs = dogs);
    this.userService.userObservable$.subscribe(user => this.user = user);
  }

  submitForm(): void {
    this.adoptionForm.valid && this.dogService.requestAdoption({
      ...this.adoptionForm.value,
      userId: this.user.id
    }).subscribe(() => {
      alert('הבקשה נשלחה בהצלחה!');
      this.router.navigate(['/dashboard']);
    }, error => alert(`קרתה שגיאה: ${error.message}`));
  }

  dateComparisonValidator(formGroup: FormGroup): { dateComparison: boolean } | null {
    const adoptionDate: Date = formGroup.get('adoptionDate')?.value;
    return adoptionDate > new Date() ? {dateComparison: true} : null;
  }
}
