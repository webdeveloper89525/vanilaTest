export const counter = (value: number = 0): [() => number, () => void] => {
    function getValue(): number {
        return value;
    }
    
    function incrementValue(): void {
        value++;
    }
    
    return [getValue, incrementValue];
};

// test case
const [getA, nextA] = counter(1);
nextA();
console.log('getA should be 2', getA());

nextA();
console.log('getA should be 3', getA());

const [getB, nextB] = counter(1);
nextB();
console.log('getB should be 2', getB());
console.log('getA should be 3', getA());

nextB();
console.log('getB should be 3', getB());
console.log('getA should be 3', getA());