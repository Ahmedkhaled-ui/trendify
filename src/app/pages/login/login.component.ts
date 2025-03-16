import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { FormerrorComponent } from '../../shared/components/ui/formerror/formerror.component';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormerrorComponent, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  callApi: WritableSignal<boolean> = signal(false);
  closeButton: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  signIn: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,7}$/),
      ]),
    },
    { updateOn: 'submit' }
  );

  signUpUser() {
    this.callApi.set(true);
    if (this.closeButton() == false) {
      this.closeButton.set(true);
      this.authenticationService.signIn(this.signIn.value).subscribe({
        next: (res) => {
          this.callApi.set(false);
          console.log(res.token);
          localStorage.setItem('userToken', res.token);
          this.authenticationService.saveUser();

          this.closeButton.set(false);
          this.signIn.reset();
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.errorMessage.set('Incorrect email or password');
          this.signIn.reset();
          this.closeButton.set(false);
          this.callApi.set(false);
        },
      });
    }
  }
  removeErrorMessage() {
    this.errorMessage.set('');
  }
  submitForm() {
    this.signIn.markAllAsTouched();
    if (this.signIn.valid) {
      this.signUpUser();
    }
  }
}
