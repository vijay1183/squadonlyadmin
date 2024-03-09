import { Component, Input } from '@angular/core';
interface breadcrumbs {
  title: string;
  link: string;
}
@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: breadcrumbs[] = [];
  constructor() { }
}
