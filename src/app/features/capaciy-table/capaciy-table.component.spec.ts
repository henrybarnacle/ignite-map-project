import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaciyTableComponent } from './capaciy-table.component';

describe('CapaciyTableComponent', () => {
  let component: CapaciyTableComponent;
  let fixture: ComponentFixture<CapaciyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapaciyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapaciyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
