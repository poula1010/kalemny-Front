import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MustMatch, UniqueEmail, UniqueUsername } from '../auth-validators.directive';
import { AuthService, RegisterDto } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private uniqueUsernameValidator: UniqueUsername, private uniqueEmailValidator: UniqueEmail) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl("", { asyncValidators: [this.uniqueUsernameValidator.validate.bind(this.uniqueUsernameValidator)], validators: [Validators.required, Validators.minLength(4)] }),
      "email": new FormControl("", { asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)], validators: [Validators.required, Validators.email] }),
      "name": new FormControl("", [Validators.required, Validators.maxLength(32)]),
      "password": new FormControl("", [Validators.required]),
      "confirm-password": new FormControl("", [Validators.required])
    }, { validators: MustMatch('password', 'confirm-password') })
  }
  registerForm: FormGroup;
  onSubmit() {
    if (this.registerForm.valid) {
      const registerDto: RegisterDto = {
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.authService.signUp(registerDto).subscribe(response => {
        if (response.success) {
          this.authService.login(registerDto.username, registerDto.password).subscribe(response => {
            this.router.navigate([""]);
          })
        }
      });

    }
  }
}
