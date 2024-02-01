import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFileComponent } from './profile-file.component';

describe('ProfileFileComponent', () => {
  let component: ProfileFileComponent;
  let fixture: ComponentFixture<ProfileFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
