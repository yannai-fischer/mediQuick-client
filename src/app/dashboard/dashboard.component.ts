import {Component, OnInit} from '@angular/core';
import {DogService} from "../../services/dog.service";
import {Dog} from "../../utils/interfaces";
import {BREED_TO_IMG} from "../../utils/consts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dogsToVaccinate: Dog[] = [];
  randomFact: string = '';

  constructor(private dogService: DogService) {
  }

  ngOnInit(): void {
    this.dogService.getDogsToVaccinate().subscribe((dogs: Dog[]) => this.dogsToVaccinate = dogs);
    this.dogService.getRandomFact().subscribe((fact: string) => this.randomFact = fact);
  }

  getDogImagePath(breed: string): string | undefined {
    return BREED_TO_IMG.get(breed);
  }
}
