import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public ToggleMenu$!: Observable<boolean>;
  public innerWidth: any;
  public user: any;
  constructor(
    public CF: CommonService
  ) {
    this.CF.userinfo().then(user => this.user = user);
  }
  ngOnInit() {
    this.ToggleMenu$ = this.CF.toggleMenu$;
    this.innerWidth = window.innerWidth;
    if (window.innerWidth < 600) {
      this.CF.toggleMenu$.next(true);
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    if (window.innerWidth < 600) {
      this.CF.toggleMenu$.next(true);
    }
  }
}
