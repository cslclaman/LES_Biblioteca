import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnuEmprestimoComponent } from './mnu-emprestimo.component';

describe('MnuEmprestimoComponent', () => {
  let component: MnuEmprestimoComponent;
  let fixture: ComponentFixture<MnuEmprestimoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnuEmprestimoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnuEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
