import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnuReservaComponent } from './mnu-reserva.component';

describe('MnuReservaComponent', () => {
  let component: MnuReservaComponent;
  let fixture: ComponentFixture<MnuReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnuReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnuReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
