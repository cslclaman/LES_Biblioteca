import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLivroComponent } from './reg-livro.component';

describe('RegLivroComponent', () => {
  let component: RegLivroComponent;
  let fixture: ComponentFixture<RegLivroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegLivroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
