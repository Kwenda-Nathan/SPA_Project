/*
this javascript is used to generate the QR code of the provided 
encrypted text
*/

const out_text = document.querySelector('.out_text');
const QR_Code_btn = document.querySelector('.QR_Code_btn');
const loader = document.querySelector('.loader');
const Qr_image = document.querySelector('.Qr_image');

/*
QR code generation
*/

QR_Code_btn.onclick = async () => {
    if (!out_text) {
        console.error("Error: Element with class 'out_text' not found in DOM.");
        return;
    }

    Qr_image.src = ''; // Clear previous QR code
    loader.style.display = 'block'; // Show loader

    let outputtextValue = out_text.value.trim(); // Fix: Use `.value`, remove spaces

    if (outputtextValue.length === 0) {
        alert("Output text must not be empty to generate QR code");
        loader.style.display = 'none'; // Hide loader if there's no text
        return;
    }

    let imagesource = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(outputtextValue)}`;

    try {
        let data = await fetch(imagesource);
        let response = await data.blob();
        let url = URL.createObjectURL(response);

        Qr_image.src = url; // Set QR code image
        loader.style.display = 'none'; // Hide loader after success
    } catch (error) {
        console.error("Error generating QR code:", error);
        alert("Failed to generate QR code. Please try again.");
        loader.style.display = 'none'; // Hide loader on error
    }
};