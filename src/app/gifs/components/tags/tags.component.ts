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
    { name: 'all', bg: 'border border-yellow-600 hover:bg-yellow-600' },
    { name: 'dance', bg: 'border border-green-600 hover:bg-green-600' },
    { name: 'music', bg: 'border border-blue-600 hover:bg-blue-600' },
    { name: 'art', bg: 'border border-violet-600 hover:bg-violet-600' },
    { name: 'other', bg: 'border border-red-600 hover:bg-red-600' },
  ];

  public getByTag(tag: string): void {
    if (tag === 'all') {
      this.gifsService.getGifs();
    } else {
      this.gifsService.getGifByTag(tag);
    }
  }
}
