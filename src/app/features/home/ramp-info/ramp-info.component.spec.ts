import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RampInfoComponent } from './ramp-info.component';

describe('RampInfoComponent', () => {
  let component: RampInfoComponent;
  let fixture: ComponentFixture<RampInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RampInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RampInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
