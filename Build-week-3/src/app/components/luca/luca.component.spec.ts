import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucaComponent } from './luca.component';

describe('LucaComponent', () => {
  let component: LucaComponent;
  let fixture: ComponentFixture<LucaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LucaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
