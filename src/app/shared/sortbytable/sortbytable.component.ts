import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sortbytable',
  templateUrl: './sortbytable.component.html',
  styleUrls: ['./sortbytable.component.scss']
})
export class SortbytableComponent implements OnInit {
  @Input() selectedOption: string = 'All';
  @Input() fields: any = [];
  @Output() Clickevent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // console.log(this.fields)
  }
  public onChange() {
    this.Clickevent.emit(this.selectedOption);
  }
}
