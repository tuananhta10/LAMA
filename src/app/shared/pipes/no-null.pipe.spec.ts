import { NoNullPipe } from './no-null.pipe';

describe('NoNullPipe', () => {
  it('create an instance', () => {
    const pipe = new NoNullPipe();
    expect(pipe).toBeTruthy();
  });
});
