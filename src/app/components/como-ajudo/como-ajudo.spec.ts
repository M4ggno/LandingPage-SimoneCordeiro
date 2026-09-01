import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoAjudo } from './como-ajudo';

describe('ComoAjudo', () => {
  let component: ComoAjudo;
  let fixture: ComponentFixture<ComoAjudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoAjudo],
    }).compileComponents();

    fixture = TestBed.createComponent(ComoAjudo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
