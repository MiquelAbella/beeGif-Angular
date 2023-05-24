import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'register-modal',
  templateUrl: './register-modal.component.html',
  styles: [],
})
export class RegisterModalComponent {
  public user: User | null = null;
  public registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  toggleLoginModal() {
    this.sharedService.toggleLoginModal();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const formValues = this.registerForm.value;
    console.log(formValues);
    this.authService.register(formValues).subscribe((res) => {
      if (res?.ok) {
        this.user = res.user;
        this.toggleLoginModal();
      }
    });
  }
}
