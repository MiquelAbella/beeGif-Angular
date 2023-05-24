import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormControl } from '@angular/forms';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { AuthService } from '../../../auth/auth.service';
import { User } from 'src/app/gifs/interfaces/user.interface';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styles: [],
})
export class NavComponent implements OnInit {
  public searchInput = new FormControl('');
  public user: User | undefined = undefined;

  constructor(
    private sharedService: SharedService,
    private gifsService: GifsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((value) => {
      this.user = value;
    });
  }

  searchGifs() {
    const value: string = this.searchInput.value || '';
    if (value.length < 1) return;
    this.sharedService.search(value).subscribe((gifs) => {
      if (gifs) {
        this.gifsService.gifList = gifs.gifs;
      }
    });
  }

  toggleLoginModal() {
    this.sharedService.toggleLoginModal();
  }

  logout() {
    this.authService.logout();
  }
}
