import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateDateComponent } from './calculate-date.component';

describe('CalculateDateComponent', () => {
  let component: CalculateDateComponent;
  let fixture: ComponentFixture<CalculateDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
