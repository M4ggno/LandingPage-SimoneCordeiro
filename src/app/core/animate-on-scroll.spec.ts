import { AnimateOnScroll } from './animate-on-scroll';

describe('AnimateOnScroll', () => {
  it('should create an instance', () => {
    const directive = new AnimateOnScroll({} as any, {} as any);
    expect(directive).toBeTruthy();
  });
});
