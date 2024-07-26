import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTimeComponent } from './forecast-time.component';

describe('ForecastTimeComponent', () => {
  let component: ForecastTimeComponent;
  let fixture: ComponentFixture<ForecastTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ForecastTimeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ForecastTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
