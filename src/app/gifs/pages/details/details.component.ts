import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: [],
})
export class DetailsComponent implements OnInit {
  public currentGif: Gif | undefined = undefined;
  public isEditing: boolean = false;
  public editFormControl = new FormControl();
  public user: User | undefined = undefined;
  public isOwner: boolean | undefined = true;
  public isHovered: boolean = false;
  public editedMessageVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gifsService: GifsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gifId = params['id'];
      this.gifsService.getGifById(gifId).subscribe((gif) => {
        if (gif) {
          this.currentGif = gif.gif;
          this.authService.user.subscribe((value) => {
            this.user = value;
            this.isOwner = this.user && this.user?._id === gif.gif.owner;
            // this.isOwner = true;
          });
        }
      });
    });
  }

  toggleIsEditing(): void {
    this.isEditing = !this.isEditing;
  }

  editGifTitle(): void {
    const value: string = this.editFormControl.value || '';
    this.gifsService.editTitle(this.currentGif?._id, value).subscribe((res) => {
      if (res) {
        this.currentGif = res.updatedGif;
        this.gifsService.gifList = this.gifsService.gifList.map((gif) => {
          if (gif._id === res.updatedGif._id) {
            return res.updatedGif;
          } else {
            return gif;
          }
        });
        this.isEditing = false;
        this.editedMessageVisible = true;
        setTimeout(() => {
          this.editedMessageVisible = false;
        }, 2000);
      }
    });
  }

  deleteGif(): void {
    this.gifsService.deleteGif(this.currentGif?._id).subscribe((res) => {
      if (res?.ok) {
        this.gifsService.gifList = this.gifsService.gifList.filter(
          (gif) => gif._id !== this.currentGif?._id
        );
        this.currentGif = undefined;
        this.isEditing = false;
        this.router.navigate(['/']);
      }
    });
  }

  hover() {
    this.isHovered = true;
  }
  unHover() {
    this.isHovered = false;
  }
}
