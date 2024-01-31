import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeAddressComponent } from './create-home-address.component';

describe('CreateHomeAddressComponent', () => {
  let component: CreateHomeAddressComponent;
  let fixture: ComponentFixture<CreateHomeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHomeAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHomeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
