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