import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSocioComponent } from './dash-socio.component';

describe('DashSocioComponent', () => {
  let component: DashSocioComponent;
  let fixture: ComponentFixture<DashSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
