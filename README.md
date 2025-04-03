# CryptoSim – Caesar & XOR Encryption
// Readme file 

## Overview
CryptoSim is a simple encryption simulator that implements two basic encryption and decryptiton techniques: Caesar Cipher and XOR Encryption. It allows users to select between two ciphers then input text to be encrypted, and view the output instantly. Additionally, the application supports data persistence, enabling users to save encrypted messages for future reference.

## Features 
- **Caesar Cipher**: Shifts each letter in the input text by a specified number of positions
- **XOR Encryption**: Encrypts the input text by performing a bitwise XOR operation with a key
- **Data Persistence**: Saves encrypted messages for future reference
- **User Interface**: Simple and intuitive interface for selecting ciphers and inputting text
- **Error Handling**: Handles invalid inputs and provides informative error messages

## Installation
To run CryptoSim, simply clone the repository and execute the appindex.html and run it in your browser 

## Usage
1. Run the application
2. Select the desired cipher (Caesar or XOR)
3. Input the text to be encrypted
4. Choose the encryption key (for Caesar) or key (for XOR)
5. Click the "Encrypt" button to view the encrypted text
6. To save the encrypted message, click the "Save" button 
7. View or delete saved data as needed

## Caesar Cipher explanation 
simple explanation with letters A to G <br>
0 1 2 3 4 5 6 | <= shift values |                                | 2 3 4 5 6 0 1 <br> 
                               => select 2 as shift value      | <br> 
A B C D E F G | <= plain text   |                                | A B C D E F G  <br>

you see after selecting shift value as 2 A is now represented by C and so on

## XOR Cipher explanation 
Example C as our plain text and K as our key so we need the binary values of the characters so that we XOR them <br>

C => 0 1 0 0 0 0 1 1 <br>
XOR <br>
K => 0 1 0 0 1 0 1 1 <br>
out=>0 0 0 0 1 0 0 0 => this is going to be the final output what it is doing is that where ever we have same binary
values for example 1 and 1 or 0 and 0 the XOR out is always 0 and for different binary value it is always 1
but for this project the out put has been limited to ASCII printable characters (character code 32-127)

## Code Structure
The code is organized into the following sections:
- **app.js**: Implements the Caesar Cipher and the XOR Encryption and decryption functions also local data storage
- **appindex.html**: The user interface, and the main page to all the cipher tools
- **styles**: Styles the user interface
- **scripts**: All the js files that handle user inputs and updates the UI accordingly

## Technologies Used 
- **JavaScript**: For the encryption and decryption logic, as well as the user interface
- **HTML**: For the user interface and structure
- **CSS**: For styling the user interface
- **Local Storage**: For data persistence

## Project Vision 
CryptoSim aims to provide a simple and accessible way for users to explore and understand basic encryption techniques.
It is designed to be a learning tool, helping users understand the fundamental principles of encryption and decryption.
The application's user-friendly interface and data persistence features make it an ideal tool for educational purposes.

## Future Improvements 
- **Add more encryption techniques**: Implement additional encryption methods, such as Vigenère Cipher or AES
- **Improve user interface**: Enhance the user interface with more intuitive navigation and visual feedback
- **Add error handling**: Implement more robust error handling to handle edge cases and unexpected user inputs
- **Add a help section**: Provide a help section with explanations of the encryption techniques and their usag

