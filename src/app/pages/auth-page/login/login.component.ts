import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { map, take } from 'rxjs';
interface LoginDto {
  usernameOrEmail: string,
  password: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usernameOrEmail: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  loginForm: FormGroup;
  onSubmit() {
    const loginDto: LoginDto = {
      usernameOrEmail: this.loginForm.value.usernameOrEmail,
      password: this.loginForm.value.password
    }
    if (this.loginForm.valid) {
      this.authService.login(loginDto.usernameOrEmail, loginDto.password).subscribe(response => {
        this.router.navigate([""]);
      });

    }
  }
}
