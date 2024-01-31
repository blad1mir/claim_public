import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommunitiesComponent } from './create-communities.component';

describe('CreateCommunitiesComponent', () => {
  let component: CreateCommunitiesComponent;
  let fixture: ComponentFixture<CreateCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommunitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
