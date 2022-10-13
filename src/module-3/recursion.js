// iterative code:

let number = 0;

while (number < 5){
    console.log(number);
    number++;
}
//  0
//  1
//  2
//  3
//  4

// recursive code:

const arrayOfNumbers = [1, 0, 2, 3, 4, 2, 4, 5, 6, 7, 8, 5, 4, 3, 2, 5, 8];
function recursive(numbers){
    if( numbers.length != 0)  //validation - base case - used to stop recursion
    {
    const firstNum = arrayOfNumbers[0]; // operation
    console.log({firstNum, arrayOfNumbers});
    arrayOfNumbers.shift(); // operation
    recursive(arrayOfNumbers); //recursive call
    }
}

recursive(arrayOfNumbers);
// {firstNum: 1, arrayOfNumbers: Array(17)}
// {firstNum: 0, arrayOfNumbers: Array(16)}
// {firstNum: 2, arrayOfNumbers: Array(15)}
// {firstNum: 3, arrayOfNumbers: Array(14)}
// {firstNum: 4, arrayOfNumbers: Array(13)}
// {firstNum: 2, arrayOfNumbers: Array(12)}
// {firstNum: 4, arrayOfNumbers: Array(11)}
// {firstNum: 5, arrayOfNumbers: Array(10)}
// {firstNum: 6, arrayOfNumbers: Array(9)}
// {firstNum: 7, arrayOfNumbers: Array(8)}
// {firstNum: 8, arrayOfNumbers: Array(7)}
// {firstNum: 5, arrayOfNumbers: Array(6)}
// {firstNum: 4, arrayOfNumbers: Array(5)}
// {firstNum: 3, arrayOfNumbers: Array(4)}
// {firstNum: 2, arrayOfNumbers: Array(3)}
// {firstNum: 5, arrayOfNumbers: Array(2)}
// {firstNum: 8, arrayOfNumbers: Array(1)}