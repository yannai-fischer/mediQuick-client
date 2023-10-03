import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DogService} from "../../services/dog.service";
import {Dog} from "../../utils/interfaces";

const AGE_MAP:Map<string, number[]> = new Map<string, number[]>([
  ['puppy', [0, 2]],
  ['young', [3, 8]],
  ['adult', [9, 25]]
]);

@Component({
  selector: 'matchmake-form',
  templateUrl: './matchmake-form.component.html',
  styleUrls: ['./matchmake-form.component.css']
})
export class MatchmakeFormComponent {
  dogForm: FormGroup;

  constructor(private dogService: DogService,
              private formBuilder: FormBuilder) {
    this.dogForm = this.formBuilder.group({
      age: [''],
      colour: [''],
      breed: [''],
      gender: [''],
      hasBeenNeutered: [false]
    });
  }

  submitForm(): void {
    const dogOptions: any = {};
    Object.keys(this.dogForm.value).forEach((key: string) => key !== 'age' && this.dogForm.value[key] !== '' && (dogOptions[key] = this.dogForm.value[key]));
    dogOptions.hasBeenNeutered = dogOptions.hasBeenNeutered ? 1 : 0;
    this.dogForm.valid && this.dogService.getDogs(dogOptions).subscribe((dogs: Dog[]):void => {
      const relevantDogs: Dog[] = this.getRelevantDogs(dogs, this.dogForm.value.age);
      alert(
        relevantDogs.length ?
          `הכלבים הרלוונטים הם: ${relevantDogs.map((dog: Dog) => dog.name)}`
          :
          `לא נמצאו כלבים שעומדים בתנאים...`
      )
    });
  }

  private getRelevantDogs(dogs: Dog[], age: string): Dog[] {
    return age === '' ? dogs : dogs.filter((dog: Dog) => this.isDogInAgeGroup(dog, age));
  }

  private isDogInAgeGroup(dog: Dog, age: string): boolean {
    const dogAge: number = +this.dogService.calculateDogAge(dog.birthday);
    const ages: number[] = AGE_MAP.get(age) ?? [0, 100];
    return dogAge >= ages[0] && dogAge <= ages[1];
  }

  protected readonly AGE_MAP = AGE_MAP;
}
