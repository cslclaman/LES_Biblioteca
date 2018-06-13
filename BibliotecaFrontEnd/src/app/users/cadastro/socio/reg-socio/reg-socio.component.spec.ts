import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSocioComponent } from './reg-socio.component';

describe('RegSocioComponent', () => {
  let component: RegSocioComponent;
  let fixture: ComponentFixture<RegSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
