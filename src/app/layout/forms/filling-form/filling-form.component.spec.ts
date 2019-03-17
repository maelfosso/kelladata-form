import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingFormComponent } from './filling-form.component';

describe('FillingFormComponent', () => {
  let component: FillingFormComponent;
  let fixture: ComponentFixture<FillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
