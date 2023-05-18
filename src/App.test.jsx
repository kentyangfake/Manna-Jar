import { getBookRef } from './utils/utils';


describe('parse bookRef', () => {
  it('should parse 創世紀 to 創', () => {
    expect(getBookRef('創世紀')).toBe('創');
  });
  it('should parse 斯巴拉西 to 斯巴拉西', () => {
    expect(getBookRef('斯巴拉西')).toBe('斯巴拉西');
  });
});