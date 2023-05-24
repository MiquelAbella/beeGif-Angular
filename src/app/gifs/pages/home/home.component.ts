import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gifs-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  public isLoginModalOpen: boolean = false;
  public isLogging: boolean = true;
  public user: User | undefined = undefined;
  public isUploadModalOpen: boolean = false;

  public uploadForm = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    tag: new FormControl('dance', Validators.required),
  });

  constructor(
    private gifsService: GifsService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sharedService.isLogging.subscribe((value: boolean) => {
      this.isLoginModalOpen = value;
    });
    this.authService.user.subscribe((value) => {
      this.user = value;
    });
  }

  get allGifs(): Gif[] {
    return this.gifsService.gifList;
  }

  toggleLoginModal() {
    this.sharedService.toggleLoginModal();
  }

  toggleIsLoginAndRegister() {
    this.isLogging = !this.isLogging;
  }

  toggleUploadModal() {
    this.isUploadModalOpen = !this.isUploadModalOpen;
  }

  preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  submitUpload(): void {
    if (this.uploadForm.invalid) {
      return;
    }
    const formValues = { ...this.uploadForm.value, owner: this.user?._id };
    this.gifsService.uploadGif({ ...formValues });
    this.toggleUploadModal()
  }
}
