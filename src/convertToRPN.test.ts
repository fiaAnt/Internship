import convertToRPN, { BadSequenceError, calculateRPNExpression, DivideByZeroError } from "./convertToRPN"

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
    it('convents ( 1 * 4 ) / ( 4 - 2 ) to 1 4 * 4 2 - /', () => {
        expect(convertToRPN('( 1 * 4 ) / ( 4 - 2 )')).toBe('1 4 * 4 2 - /')
    })
})

describe('Parameter validation', () => {
    it('throws Error for empty string', () => {
        expect(() => convertToRPN('')).toThrow('Expression is empty');
    })
})

describe('Expression validation', () => {
    it('throws BadSequenceError', () => {
        expect(() => convertToRPN('a + b')).toThrow(BadSequenceError);
        expect(() => convertToRPN('1 & 2')).toThrow(BadSequenceError);
        expect(() => convertToRPN('1 -- 2')).toThrow(BadSequenceError);
        expect(() => convertToRPN('(1 + 2')).toThrow(BadSequenceError);
        expect(() => convertToRPN('1 + 2)')).toThrow(BadSequenceError);
    })
})

describe('Divide by zero', () => {
    it('throws DivideByZeroError for 0 / 0', () => {
        expect(() => calculateRPNExpression('0 0 /')).toThrow(DivideByZeroError);
    });
})

describe('Calculate RPN', () => {
    it('calculate 1 + 2 = 3', () => {
        expect(calculateRPNExpression('1 2 +')).toBe(3);
    });
    it('calculate 10 / 2 = 5', () => {
        expect(calculateRPNExpression('10 2 /')).toBe(5);
    });
    it('calculate (2 + 3) * 4 = 20', () => {
        expect(calculateRPNExpression('2 3 + 4 *')).toBe(20);
    });
})

