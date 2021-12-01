import { WordPipe } from './word.pipe';

describe('WordPipe', () => {
  it('create an instance', () => {
    const pipe = new WordPipe();
    expect(pipe).toBeTruthy();
  });
});
