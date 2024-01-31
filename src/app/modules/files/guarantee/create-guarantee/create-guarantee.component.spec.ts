import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuaranteeComponent } from './create-guarantee.component';

describe('CreateGuaranteeComponent', () => {
  let component: CreateGuaranteeComponent;
  let fixture: ComponentFixture<CreateGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGuaranteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
