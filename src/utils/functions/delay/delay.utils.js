/**
 * Delay-function in Promise
 * @exampl await delay(5000)
 * @param {number} ms delay in milliseconds
 * @returns null
 */
export const delay = (ms) =>
    new Promise(() => {
        const timer = () => setTimeout(() => clearTimeout(timer), [ms]);
        timer();
    });
