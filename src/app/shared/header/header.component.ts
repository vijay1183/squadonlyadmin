import { Component } from '@angular/core';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(
    public CF: CommonService,
  ) { }


  public ToggleMenu() {
    this.CF.toggleMenu$
      .pipe(take(1))
      .subscribe(r => {
        this.CF.toggleMenu$.next(!r)
        const htmlElement = window.document.querySelector("html");
        const bodyElement = window.document.querySelector("body");
        (r) ? this.CF.renderer.addClass(htmlElement, 'sidebar_overflow') : this.CF.renderer.removeClass(htmlElement, 'sidebar_overflow');
        (r) ? this.CF.renderer.addClass(bodyElement, 'sidebar_overflow') : this.CF.renderer.removeClass(bodyElement, 'sidebar_overflow');
      })
  }
}
