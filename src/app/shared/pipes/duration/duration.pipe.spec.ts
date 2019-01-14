import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform minutes without hours', () => {
    const minutes = 10;
    expect(pipe.transform(minutes)).toBe(`${minutes}m`);
  });

  it('should transform minutes with hours', () => {
    const minutes = 130;
    expect(pipe.transform(minutes)).toBe('2h 10m');
  });
});
