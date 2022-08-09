import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideServiciosComponent } from './slide-servicios.component';

describe('SlideServiciosComponent', () => {
  let component: SlideServiciosComponent;
  let fixture: ComponentFixture<SlideServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
