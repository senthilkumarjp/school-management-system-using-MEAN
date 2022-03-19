import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teacher1Component } from './teacher1.component';

describe('Teacher1Component', () => {
  let component: Teacher1Component;
  let fixture: ComponentFixture<Teacher1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Teacher1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Teacher1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
