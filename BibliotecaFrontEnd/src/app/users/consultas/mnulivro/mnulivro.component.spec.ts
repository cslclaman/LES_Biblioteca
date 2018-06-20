import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnulivroComponent } from './mnulivro.component';

describe('MnulivroComponent', () => {
  let component: MnulivroComponent;
  let fixture: ComponentFixture<MnulivroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnulivroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnulivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
