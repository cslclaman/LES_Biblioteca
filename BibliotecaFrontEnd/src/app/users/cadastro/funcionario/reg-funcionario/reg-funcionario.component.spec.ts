import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFuncionarioComponent } from './reg-funcionario.component';

describe('RegFuncionarioComponent', () => {
  let component: RegFuncionarioComponent;
  let fixture: ComponentFixture<RegFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
