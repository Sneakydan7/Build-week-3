import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/service/posts.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | null = null;
  bioLength: number = 0;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private postSrv: PostsService
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        // Validators.required,
        // Validators.minLength(8),
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/
        // ),
      ]),
      confirmPassword: ['', Validators.required],
      gender: new FormControl('', [Validators.required]),

      biografia: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(0),
      ]),
      image: new FormControl(null, [Validators.pattern(/^https?:\/\//i)]),
      privacyAccepted: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  ngOnInit(): void {}

  insertImage() {
    const imageControl = this.registerForm?.get('image');
    if (imageControl) {
      const imageUrl = this.registerForm?.value.image;
      if (imageControl.valid) {
        imageControl.setValue(imageUrl);
      } else {
        alert('Invalid image URL');
      }
    }
  }

  register() {
    try {
      if (this.registerForm && this.passwordsMatch()) {
        this.insertImage();
        this.authSrv.register(this.registerForm.value).subscribe();

        console.log(this.registerForm.value);
      } else {
        if (this.registerForm) {
          this.registerForm.get('password')?.setValue('');
          this.registerForm.get('confirmPassword')?.setValue('');
        }
        alert('Le password non corrispondono.');
      }
    } catch (error: any) {
      alert(error);
      this.router.navigate(['/register']);
    }
  }

  passwordsMatch(): boolean {
    const password = this.registerForm?.get('password')?.value;
    const confirmPassword = this.registerForm?.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
