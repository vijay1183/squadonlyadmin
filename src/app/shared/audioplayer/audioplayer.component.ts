import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-audioplayer',
  standalone: false,
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})
export class AudioplayerComponent {
  @Input() PodcastURL: string | undefined;
}
