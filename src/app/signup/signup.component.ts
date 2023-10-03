import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  onSubmit(): void {
    this.userService.signup(this.formGroup.value).subscribe(() => {
      alert("המשתמש נוצר בהצלחה!");
      this.router.navigate(['/']);
    });
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const confirmPasswordControl = formGroup.get('confirmPassword');
    const passwordControl = formGroup.get('password');
    confirmPasswordControl && passwordControl && confirmPasswordControl.setErrors(passwordControl.value !== confirmPasswordControl.value ? { passwordMatch: true } : null);
  }

}
