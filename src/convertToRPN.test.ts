import convertToRPN from "./convertToRPN"

describe('converts it to Reverse Polish Notation', () => {
    it('error', () => {
        expect(() => convertToRPN('1 + 2')).toBe('1 2 +')
        expect(() => convertToRPN('')).toThrow()
    })
})