import { classNames } from "../classNames";

describe('classNames', () => {
  it('returns a string with a single class', () => {
    expect(classNames('container')).toBe('container');
  });

  it('joins multiple classes into a space-separated string', () => {
    expect(classNames('container', 'container_active', 'container_large')).toBe(
      'container container_active container_large',
    );
  });

  it('ignores falsy values (null, undefined, false)', () => {
    expect(classNames('container', null, undefined, false, 'container_active')).toBe(
      'container container_active',
    );
  });

  it('returns an empty string when called with no arguments', () => {
    expect(classNames()).toBe('');
  });
});
