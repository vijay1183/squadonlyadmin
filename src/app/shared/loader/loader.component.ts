import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    private router: Router,
    public CF: CommonService,
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.CF.isSpinnerVisible = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.CF.isSpinnerVisible = false;        
        if (window.innerWidth < 600) {
          this.CF.toggleMenu$.next(true);
        }
      }
    }, () => { this.CF.isSpinnerVisible = false; });
  }
}
