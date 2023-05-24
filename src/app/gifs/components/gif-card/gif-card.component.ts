import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: [],
})
export class GifCardComponent {
  @Input()
  public gif!: Gif;

  getBackground(tag: string): string {
    switch (tag) {
      case 'all':
        return 'bg-yellow-600';
      case 'dance':
        return 'bg-green-600';
      case 'music':
        return 'bg-blue-600';
      case 'art':
        return 'bg-violet-600';
      case 'other':
        return 'bg-red-600';
      default:
        return 'bg-violet-500';
    }
  }

  public copyUrl(url: string): void {
    navigator.clipboard.writeText(url);
  }
}
