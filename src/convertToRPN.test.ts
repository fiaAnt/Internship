import convertToRPN from "./convertToRPN"

describe('converts it to Reverse Polish Notation', () => {
    it('converts 1 + 2', () => {
        expect(convertToRPN('1 + 2')).toBe('1 2 +')
    })
    it('converts 8 - 4', () => {
        expect(convertToRPN('8 - 4')).toBe('8 4 -')
    })
    it('converts 1 * 2', () => {
        expect(convertToRPN('1 * 2')).toBe('1 2 *')
    })
    it('converts 8 / 4', () => {
        expect(convertToRPN('8 / 4')).toBe('8 4 /')
    })
    it('converts 2 + 3 * 4 to 2 3 4 * +', () => {
        expect(convertToRPN('2 + 3 * 4')).toBe('2 3 4 * +');
    });
    it('converts ( 2 + 3 ) * 4 to 2 3 + 4 *', () => {
        expect(convertToRPN('( 2 + 3 ) * 4')).toBe('2 3 + 4 *');
    });
})