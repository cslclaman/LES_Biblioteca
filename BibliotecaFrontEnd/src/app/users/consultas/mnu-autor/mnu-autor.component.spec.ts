import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnuAutorComponent } from './mnu-autor.component';

describe('MnuAutorComponent', () => {
  let component: MnuAutorComponent;
  let fixture: ComponentFixture<MnuAutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnuAutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnuAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
