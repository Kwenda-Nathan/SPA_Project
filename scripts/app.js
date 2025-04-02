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

function xorCipherReadableWithBinary(text, key, decrypt = false) {
  let result = "";
  let binaryMap = [];
  let keyChar = key.charCodeAt(0); 

  for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let xorValue = charCode ^ keyChar;
      if (xorValue < 32 || xorValue > 126) {
          xorValue = (xorValue % 95) + 32;
      }
      let encryptedChar = String.fromCharCode(xorValue);
      result += encryptedChar;
      binaryMap.push(`${text[i]} (${charCode.toString(2).padStart(8, '0')}) → ${encryptedChar} (${xorValue.toString(2).padStart(8, '0')})`);
  }

  return { text: result, binary: binaryMap.join("\n") };
}

function encryptXORText() {
  let text = document.getElementById("inputText").value;
  let key = document.getElementById("key").value;
  if (key.length !== 1) {
      alert("XOR key must be a single character.");
      return;
  }
  let xorResult = xorCipherReadableWithBinary(text, key);
  document.getElementById("result").textContent = xorResult.text;
  document.getElementById("binaryOutput").textContent = xorResult.binary;
}

function decryptXORText() {
  encryptXORText(); // XOR decryption is the same as encryption
}

// Save Data to Local Storage

function saveData() {
  let inputText = document.getElementById("inputText").value;
  let shift = document.getElementById("shiftValue").value;
  let outputText = document.getElementById("outputText").value;

  if (!inputText || !shift || !outputText) {
      alert("Please enter text, shift value, and generate output before saving.");
      return;
  }

  let savedData = JSON.parse(localStorage.getItem("cipherData")) || [];
  savedData.push({ inputText, shift, outputText });
  localStorage.setItem("cipherData", JSON.stringify(savedData));
  alert("Data saved successfully!");
}

function loadSavedData() {
  console.log("Stash.html script is running"); // Debugging
  let savedData = JSON.parse(localStorage.getItem("cipherData")) || [];
  let container = document.getElementById("savedDataContainer");
  container.innerHTML = "";

  console.log("Retrieved Data:", savedData); // Debugging

  savedData.forEach((entry, index) => {
      let div = document.createElement("div");
      div.innerHTML = `<p><strong>Input:</strong> ${entry.inputText}<br>
                       <strong>Shift:</strong> ${entry.shift}<br>
                       <strong>Output:</strong> ${entry.outputText}</p>
                       <button onclick="deleteEntry(${index})">Delete</button>`;
      container.appendChild(div);
  });
}


// Delete a Specific Entry
function deleteEntry(index) {
  let savedData = JSON.parse(localStorage.getItem("cipherData")) || [];
  savedData.splice(index, 1); // Remove the entry at the specified index
  localStorage.setItem("cipherData", JSON.stringify(savedData));
  loadSavedData(); // Reload the data to reflect changes
}

// Event Listeners
document.querySelector(".Store_btn").addEventListener("click", saveData);
document.addEventListener("DOMContentLoaded", loadSavedData);

// Save XOR Data
function saveXORData() {
  let inputText = document.getElementById("inputText").value;
  let key = document.getElementById("key").value;
  let outputText = document.getElementById("result").innerText;

  if (!inputText || !key || !outputText) {
      alert("Please enter text, a key, and generate output before saving.");
      return;
  }

  let savedXORData = JSON.parse(localStorage.getItem("xorCipherData")) || [];
  savedXORData.push({ inputText, key, outputText });
  localStorage.setItem("xorCipherData", JSON.stringify(savedXORData));
  alert("XOR Data saved successfully!");
}

//  Load All Saved Data on Stash Page
function loadSavedData() {
  console.log("Loading saved data...");

  let savedData = JSON.parse(localStorage.getItem("cipherData")) || [];
  let savedXORData = JSON.parse(localStorage.getItem("xorCipherData")) || [];

  let caesarContainer = document.getElementById("savedDataContainer");
  let xorContainer = document.getElementById("savedXORContainer");

  if (!caesarContainer || !xorContainer) {
      console.error("Stash containers not found.");
      return;
  }

  // Clear containers before reloading data
  caesarContainer.innerHTML = "";
  xorContainer.innerHTML = "";

  // Load Caesar Cipher Data
  savedData.forEach((entry, index) => {
      let div = document.createElement("div");
      div.innerHTML = `
          <p><strong>Input:</strong> ${entry.inputText}<br>
             <strong>Shift:</strong> ${entry.shift}<br>
             <strong>Output:</strong> ${entry.outputText}</p>
          <button onclick="deleteEntry(${index}, 'cipherData')">Delete</button>
      `;
      caesarContainer.appendChild(div);
  });

  // Load XOR Cipher Data
  savedXORData.forEach((entry, index) => {
      let div = document.createElement("div");
      div.innerHTML = `
          <p><strong>Input:</strong> ${entry.inputText}<br>
             <strong>Key:</strong> ${entry.key}<br>
             <strong>Output:</strong> ${entry.outputText}</p>
          <button onclick="deleteEntry(${index}, 'xorCipherData')">Delete</button>
      `;
      xorContainer.appendChild(div);
  });

  console.log("Saved data loaded successfully.");
}

// Delete a Specific Entry (XOR)
function deleteEntry(index, storageKey) {
  let savedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  savedData.splice(index, 1); // Remove the entry at the specified index
  localStorage.setItem(storageKey, JSON.stringify(savedData));
  loadSavedData(); // Reload the data to reflect changes
}

// Event Listeners
document.querySelector(".Store_btn").addEventListener("click", saveXORData);
document.addEventListener("DOMContentLoaded", loadSavedData);
