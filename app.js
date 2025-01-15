// JavaScript content for the Caesar cipher web application
function caesarCipher(str, shift) {
    return str
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = char === char.toLowerCase() ? 97 : 65;
          // Adjust shift for wrapping and non-alphabetic cases
          const shiftedChar = String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
          return shiftedChar;
        }
        return char; // Non-alphabetic characters remain unchanged
      })
      .join('');
  }
  
function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const shiftValue = parseInt(document.getElementById('shiftValue').value, 10);
    if (isNaN(shiftValue)) {
      alert("Please enter a valid shift value.");
      return;
    }
    const outputText = caesarCipher(inputText, shiftValue);
    document.getElementById('outputText').value = outputText;
}
  
function decryptText() {
    const inputText = document.getElementById('inputText').value;
    const shiftValue = parseInt(document.getElementById('shiftValue').value, 10);
    if (isNaN(shiftValue)) {
      alert("Please enter a valid shift value.");
      return;
    }
    const outputText = caesarCipher(inputText, -shiftValue);
    document.getElementById('outputText').value = outputText;
}

