import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public today = new Date();
  public active = 1;
  public latestRuns: any;
  public myFollowups: any;
  public myResolved: any;
  constructor(
    private ActivateRoute: ActivatedRoute,
    public CF: CommonService
  ) {
  }
  ngOnInit(): void {
    this.ActivateRoute.data
      .pipe(first())
      .subscribe((response: any) => {
      
      })
  }
}
