import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMobileComponent } from './delete-mobile.component';

describe('DeleteMobileComponent', () => {
  let component: DeleteMobileComponent;
  let fixture: ComponentFixture<DeleteMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
