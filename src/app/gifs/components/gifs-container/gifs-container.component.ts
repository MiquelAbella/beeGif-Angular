import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-container',
  templateUrl: './gifs-container.component.html',
  styles: [],
})
export class GifsContainerComponent {
  @Input()
  public gifs: Gif[] = [];
}
