import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/service";
import {Treatment} from "../models/models";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {
  treatments!: Treatment[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getTreatments().subscribe(data => this.treatments = data,);
  }
}
