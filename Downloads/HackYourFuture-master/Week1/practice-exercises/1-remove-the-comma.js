/**
 * We want to remove the comma's in the given string (myString), replace them with a space and log it to the console.
 * 
 * The end result should be: 
 *   hello this is a difficult to read sentence
 */

let myString = 'hello,this,is,a,difficult,to,read,sentence';
myString = myString.replaceAll(',', ' ');
console.log(myString);
myString=myString.replace(/,/g, ' ');
console.log(myString);
myString=myString.split(',').join(' ');
/* --- Code that will test your solution, do NOT change. Write above this line --- */
console.log(myString);
console.assert(myString === 'hello this is a difficult to read sentence', 'There is something wrong with your solution');