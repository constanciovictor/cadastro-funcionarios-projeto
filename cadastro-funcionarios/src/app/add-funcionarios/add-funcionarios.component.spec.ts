import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuncionariosComponent } from './add-funcionarios.component';

describe('AddFuncionariosComponent', () => {
  let component: AddFuncionariosComponent;
  let fixture: ComponentFixture<AddFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
