import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-tags',
  templateUrl: './tags.component.html',
  styles: [],
})
export class TagsComponent {
  constructor(private gifsService: GifsService) {}
  public tags = [
    { name: 'all', bg: 'bg-yellow-600' },
    { name: 'dance', bg: 'bg-green-600' },
    { name: 'music', bg: 'bg-blue-600' },
    { name: 'art', bg: 'bg-violet-600' },
    { name: 'other', bg: 'bg-red-600' },
  ];

  public getByTag(tag: string): void {
    if (tag === 'all') {
      this.gifsService.getGifs();
    } else {
      this.gifsService.getGifByTag(tag);
    }
  }
}
