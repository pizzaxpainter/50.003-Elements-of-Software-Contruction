// Helper function to choose a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Function to generate a random integer
  function generateRandomInteger() {
    return Math.floor(Math.random() * 10);
  }
  
  // Function for non-terminal Integer ::= Digit | Integer Digit
  function generateInteger() {
    let integer = generateRandomInteger().toString();
    if (Math.random() < 0.5) {
      integer += generateInteger();
    }
    return integer;
  }
  
  // Function for non-terminal Factor
  function generateFactor() {
    const randomChoice = Math.random();
    if (randomChoice < 0.25) {
      return `-${generateInteger()}`;
    } else if (randomChoice < 0.5) {
      return `(${generateExpr()})`;
    } else {
      return generateInteger() + (Math.random() < 0.5 ? `.${generateInteger()}` : '');
    }
  }
  
  // Function for non-terminal Term
  function generateTerm() {
    const randomChoice = Math.random();
    if (randomChoice < 1 / 3) {
      return generateTerm() + '*' + generateFactor();
    } else if (randomChoice < 2 / 3) {
      return generateTerm() + '/' + generateFactor();
    } else {
      return generateFactor();
    }
  }
  
  // Function for non-terminal Expr
  function generateExpr() {
    const randomChoice = Math.random();
    if (randomChoice < 1 / 3) {
      return generateExpr() + '+' + generateTerm();
    } else if (randomChoice < 2 / 3) {
      return generateExpr() + '-' + generateTerm();
    } else {
      return generateTerm();
    }
  }
  
  // Function for non-terminal S (start symbol)
  function generateInput() {
    return generateExpr();
  }
  
  export default generateInput;