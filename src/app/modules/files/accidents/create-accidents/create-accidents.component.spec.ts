import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccidentsComponent } from './create-accidents.component';

describe('CreateAccidentsComponent', () => {
  let component: CreateAccidentsComponent;
  let fixture: ComponentFixture<CreateAccidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccidentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
