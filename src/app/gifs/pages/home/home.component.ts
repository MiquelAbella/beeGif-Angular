import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'gifs-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  public isLoginModalOpen: boolean = false;
  public isLogging: boolean = true;

  constructor(
    private gifsService: GifsService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.isLogging.subscribe((value: boolean) => {
      this.isLoginModalOpen = value;
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

  preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }
}
