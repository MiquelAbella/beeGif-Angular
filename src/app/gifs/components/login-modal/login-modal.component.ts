import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../interfaces/user.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styles: [],
})
export class LoginModalComponent {
  public user: User | null = null;
  public isError: boolean = false;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  toggleLoginModal() {
    this.sharedService.toggleLoginModal();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValues = this.loginForm.value;
    this.authService.login(formValues).subscribe((res) => {
      if (res?.ok) {
        this.user = res.user;
        this.toggleLoginModal();
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    });
  }
}
