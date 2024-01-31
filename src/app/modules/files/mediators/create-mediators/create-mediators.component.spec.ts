import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMediatorsComponent } from './create-mediators.component';

describe('CreateMediatorsComponent', () => {
  let component: CreateMediatorsComponent;
  let fixture: ComponentFixture<CreateMediatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMediatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMediatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
