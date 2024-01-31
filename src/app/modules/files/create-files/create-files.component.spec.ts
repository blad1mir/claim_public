import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFilesComponent } from './create-files.component';

describe('CreateFilesComponent', () => {
  let component: CreateFilesComponent;
  let fixture: ComponentFixture<CreateFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
