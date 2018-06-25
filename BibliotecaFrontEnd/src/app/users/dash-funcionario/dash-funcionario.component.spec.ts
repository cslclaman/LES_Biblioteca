import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashFuncionarioComponent } from './dash-funcionario.component';

describe('DashFuncionarioComponent', () => {
  let component: DashFuncionarioComponent;
  let fixture: ComponentFixture<DashFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
