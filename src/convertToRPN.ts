export class BadSequenceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadSequenceError';
    }
}

export class DivideByZeroError extends Error {
    constructor() {
        super("Divide by zero");
        this.name = 'DivideByZeroError';
    }
}

const addSubOperators = ['+', '-'];
const mulDivOperators = ['*', '/'];

function convertToRPN(expression: string): string {
    if (typeof expression !== "string") throw new TypeError("Expression must be a string");
    if (expression.trim() === "") throw new Error("Expression is empty");

    const tokens = expression.trim().split(/\s+/);
    const result: string[] = [];
    const stack: string[] = [];
    let openBrackets = 0;

    const handleOperator = (token: string) => {
        const precedence = mulDivOperators.includes(token) ? 2 : 1;

        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            const top = stack[stack.length - 1];
            const topPrecedence = mulDivOperators.includes(top) ? 2 : 1;

            if (topPrecedence >= precedence) {
                result.push(stack.pop()!);
            } else {
                break;
            }
        }
        stack.push(token);
    };

    const isValidToken = (token: string): boolean => {
        return !/^\d+(\.\d+)?$/.test(token)
            && !addSubOperators.includes(token)
            && !mulDivOperators.includes(token)
            && token !== '(' && token !== ')'
    }

    for (const token of tokens) {
        if (isValidToken(token)) {
            throw new BadSequenceError(`Invalid token: ${token}`);
        }

        if (!isNaN(Number(token))) {
            result.push(token);
        } else if (addSubOperators.includes(token) || mulDivOperators.includes(token)) {
            handleOperator(token);
        } else if (token === '(') {
            stack.push(token);
            openBrackets++;
        } else if (token === ')') {
            openBrackets--;
            if (openBrackets < 0) throw new BadSequenceError("Mismatched parentheses");
            while (stack.length && stack[stack.length - 1] !== '(') {
                result.push(stack.pop()!);
            }
            stack.pop();
        }
    }

    if (openBrackets !== 0) throw new BadSequenceError("Mismatched parentheses");

    while (stack.length > 0) {
        const op = stack.pop()!;
        if (op === '(' || op === ')') throw new BadSequenceError("Mismatched parentheses");
        result.push(op);
    }

    return result.join(' ');
}

export function calculateRPNExpression(rpn: string): number {
    const tokens = rpn.split(/\s+/);
    const stack: number[] = [];

    const operands: Record<string, (a: number, b: number) => number> = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) throw new DivideByZeroError();
            return a / b;
        },
    };

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        } else if (token in operands) {
            if (stack.length < 2) throw new BadSequenceError("Invalid RPN sequence");
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(operands[token](a, b));
        }
    }

    if (stack.length !== 1) throw new BadSequenceError("Invalid RPN expression");

    return stack[0];
}

export default convertToRPN;
