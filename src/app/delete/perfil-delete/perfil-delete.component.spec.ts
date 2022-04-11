import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeleteComponent } from './perfil-delete.component';

describe('PerfilDeleteComponent', () => {
  let component: PerfilDeleteComponent;
  let fixture: ComponentFixture<PerfilDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
