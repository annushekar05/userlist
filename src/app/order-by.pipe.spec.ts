import { TestBed } from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderByPipe] });
    pipe = TestBed.inject(OrderByPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: string[] = ['email','first_name','last_name'];
    const args = 'email';
    expect(pipe.transform(value, args)).toEqual(['last_name','first_name','email']);
  });
});
