function convertToRPN(expression: string): string {
    if (typeof expression !== "string") throw new TypeError("Expression must be a string");
    if (expression.trim() === "") throw new Error("Expression is empty");

    const tokens = expression.trim().split(/\s+/);
    const result: string[] = [];
    const stack: string[] = [];
    const opr1: string[] = ['+', '-']
    const opr2: string[] = ['*', '/']

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            result.push(token);
        }
        else if (opr1.includes(token)) {
            while (stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
                result.push(stack.pop()!);
            }
            stack.push(token);
        }
        else if (opr2.includes(token)) {
            while (stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
                result.push(stack.pop()!);
            }
            stack.push(token);
        }
        else if (token === '(') {
            stack.push(token);
        }
        else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                result.push(stack.pop()!);
            }
            if (stack.length > 0) stack.pop();
        }
    }
    while (stack.length > 0) {
        result.push(stack.pop()!);
    }

    return result.join(' ');
}

export default convertToRPN;