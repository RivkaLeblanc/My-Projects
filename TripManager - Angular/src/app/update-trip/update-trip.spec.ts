import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrip } from './update-trip';

describe('UpdateTrip', () => {
  let component: UpdateTrip;
  let fixture: ComponentFixture<UpdateTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
