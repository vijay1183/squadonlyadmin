import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastdetailsComponent } from './podcastdetails.component';

describe('PodcastdetailsComponent', () => {
  let component: PodcastdetailsComponent;
  let fixture: ComponentFixture<PodcastdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastdetailsComponent]
    });
    fixture = TestBed.createComponent(PodcastdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
