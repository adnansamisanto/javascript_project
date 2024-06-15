document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const capturedImageContainer = document.getElementById('capturedImage');

    const real_password = "sami1919@1919"

    const userInput = document.getElementById('userInput');
    const userError = document.getElementById('userError');
    const loginButton = document.getElementById('loginButton')

    const tryNumber = document.getElementById('tryNumber');

    const isLogin = document.getElementById('isLogin')


    // Access the webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            video.srcObject = stream;
            video.play();
        }).catch(err => {
            console.error("Error accessing webcam: ", err);
        });
    } else {
        alert("Your browser does not support accessing the webcam.");
    }


    // images taking---
    const takeImg = () => {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image data URL and display it
        const dataURL = canvas.toDataURL('image/png');
        const imgElement = document.createElement('img');
        imgElement.src = dataURL;
        capturedImageContainer.innerHTML = '';  // Clear previous image
        capturedImageContainer.appendChild(imgElement);
    }

    var tryCount = 1;

    // login and img checking --
    loginButton.addEventListener('click', () => {

        if (userInput.value == "") {
            return alert("Inter your password")
        }
        else if (userInput.value == real_password) {
            alert("Login successful")
            userInput.value = "";
            isLogin.innerHTML = `You just logged in successfully `;
        } else {
            if (tryCount > 3) {
                takeImg()
                tryCount = 0;
                isLogin.innerHTML = ``;
                userError.innerHTML = `You are not the actual user!`
                loginButton.value = `unAuthorized`
                loginButton.disabled = true;
                loginButton.style.backgroundColor = 'black';
                loginButton.style.color = 'red';
                document.getElementById('redErrorDiv').style.backgroundColor = 'red';
                document.getElementById('userInput').style.color = 'red';
            }
            tryNumber.innerHTML = tryCount;
            return tryCount = tryCount + 1;
        }
        console.log(tryCount);

    })
});
