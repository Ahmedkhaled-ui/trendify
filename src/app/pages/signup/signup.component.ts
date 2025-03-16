import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormerrorComponent } from '../../shared/components/ui/formerror/formerror.component';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, FormerrorComponent, RouterLink, TranslatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  callApi: WritableSignal<boolean> = signal(false);
  closeButton: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');

  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,7}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,7}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      check: new FormControl(null, Validators.required),
    },
    this.confirmPassword
  );

  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const repassword = form.get('rePassword')?.value;
    if (password === repassword) {
      return null;
    } else {
      return { misMath: true };
    }
  }

  signUpUser() {
    this.callApi.set(true);
    if (this.closeButton() == false) {
      this.closeButton.set(true);
      this.authenticationService.signup(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['../login/login.component.html']);
          this.callApi.set(false);
          this.closeButton.set(false);
          this.signUpForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.signUpForm.reset();
          this.closeButton.set(false);
          this.errorMessage.set('Account Already Exists!');

          this.callApi.set(false);
        },
      });
    }
  }
  removeErrorMessage() {
    this.errorMessage.set('');
  }

  submitForm() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.signUpUser();
    }
  }
}
