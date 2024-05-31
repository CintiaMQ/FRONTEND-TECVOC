import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuestionarioComponent } from './create-cuestionario.component';

describe('CreateCuestionarioComponent', () => {
  let component: CreateCuestionarioComponent;
  let fixture: ComponentFixture<CreateCuestionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCuestionarioComponent]
    });
    fixture = TestBed.createComponent(CreateCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
