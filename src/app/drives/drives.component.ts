import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DogService} from "../../services/dog.service";
import {UserService} from "../../services/user.service";
import {Dog, Drive, User} from "../../utils/interfaces";

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.css']
})
export class DrivesComponent implements OnInit {
  drives: Drive[] = [];
  driveForm!: FormGroup;
  filteredOptions: Observable<string[]>;
  dogs: Dog[] = [];
  driverMap: Map<number, string> = new Map<number, string>();
  user!: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private dogService: DogService) {
    this.filteredOptions = new Observable<string[]>();
  }

  ngOnInit(): void {
    this.driveForm = this.formBuilder.group({
      dogId: ['', Validators.required],
      timeOfDeparture: ['', Validators.required],
      source: ['', [Validators.required, this.validateLocation]],
      destination: ['', [Validators.required, this.validateLocation]]
    });
    this.dogService.getDogs().subscribe((dogs: Dog[]) => this.dogs = dogs);
    this.userService.userObservable$.subscribe((user: User) => this.user = user);
    this.dogService.getDrives().subscribe((drives: Drive[]) => (this.drives = drives) && this.setDriverMap());
    this.filteredOptions = this.driveForm.get('dogId')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    ) as Observable<string[]>;
  }

  onSubmit(): void {
    if (this.driveForm.valid) {
      const drive: Drive = this.driveForm.value;
      this.dogService.upsertDrive(drive).subscribe((drive: Drive): void => {
        this.drives.push(drive);
        this.driveForm.reset();
      });
    }
  }

  onJoinDrive(drive: Drive): void {
    if (!drive.userId && drive.id && this.user.id) {
      this.dogService.claimDrive(drive.id, this.user.id).subscribe((success: boolean): void => {
        if (success) {
          drive.userId = this.user.id ?? -1;
          this.drives[this.drives.findIndex(indexDrive => indexDrive.id == drive.id)] = drive;
          alert('ההרשמה לטרמפ התבצעה בהצלחה!');
        }
      })
    } else {
      alert('כבר קיים נהג עבור טרמפ זה');
    }
  }

  onDeleteDrive(id: number): void {
    if (id != -1 && confirm('האם אתה בטוח שברצונך למחוק טרמפ זה?')) {
      this.dogService.deleteDrive(id).subscribe((response: any): Drive[] | void =>
        response.success ? this.drives = this.drives.filter((drive: Drive): boolean => drive.id !== id) :
          alert(response.message));
    }
  }

  getRelevantDogName(dogId: number): string {
    return this.dogs.find((dog: Dog): boolean => dog.id == dogId)?.name ?? '';
  }

  private setDriverMap(): void{
    this.drives.map((drive:Drive) => !this.driverMap.has(drive.userId) && this.setRelevantDriverName(drive.userId));
  }

  private setRelevantDriverName(userId: number): void {
    this.userService.getUserById(userId).subscribe((user: User): Map<number, string> => this.driverMap.set(userId, `${user.firstName} ${user.lastName}`));
  }

  private _filter(value: string): string[] {
    return this.drives
      .filter((drive: Drive) => !drive.userId)
      .map((drive: Drive) => drive.dogId.toString())
      .filter((option: string) => option.toLowerCase().includes(value.toLowerCase()));
  }

  private validateLocation(control: { value: string; }): { [s: string]: boolean } | null {
    return /^[\u0590-\u05fe\s]+[0-9]{1,3}[\u0590-\u05fe\s]+$/.test(control.value) ? null : {'invalidLocation': true};
  }
}
