import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaButtons } from './cta-buttons';

describe('CtaButtons', () => {
  let component: CtaButtons;
  let fixture: ComponentFixture<CtaButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
