import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicInfo } from './clinic-info';

describe('ClinicInfo', () => {
  let component: ClinicInfo;
  let fixture: ComponentFixture<ClinicInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
