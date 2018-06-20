import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnuFuncionarioComponent } from './mnu-funcionario.component';

describe('MnuFuncionarioComponent', () => {
  let component: MnuFuncionarioComponent;
  let fixture: ComponentFixture<MnuFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnuFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnuFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
