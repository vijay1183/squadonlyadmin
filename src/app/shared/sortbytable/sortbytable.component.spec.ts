import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortbytableComponent } from './sortbytable.component';

describe('SortbytableComponent', () => {
  let component: SortbytableComponent;
  let fixture: ComponentFixture<SortbytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortbytableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortbytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
