import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CpfValidationDirective } from '../../directives/cpf-validation';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      document_number: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['']
    });
  }

  // getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.registerForm.value)

    // stop here if form is invalid
    if (this.registerForm.invalid) { return; }

    try {
      this.userService.create(this.registerForm.value).subscribe(createdUser => {
        console.log('user created', createdUser);
      })
    } catch (error) {
      console.error('error creating user', error);
    }

    this.loading = true;
  }
}
