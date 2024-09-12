document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('stream-xyz');
    const canvas = document.getElementById('screen-canvas-zx');
    const captureButton = document.getElementById('button-pqr');
    const finalizeButton = document.getElementById('button-end-abz');
    const letterList = document.getElementById('list-captures-wq');
    const finalWordElement = document.getElementById('result-word-qr');
    const context = canvas.getContext('2d');

    let capturedLetters = [];

    // Accéder à la caméra
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Erreur d\'accès à la caméra :', error);
        });

    // Capturer une image et envoyer à l'API
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('file', blob, 'image.png');

            fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            })            
            .then(response => response.json())
            .then(data => {
                if (data.prediction) {
                    capturedLetters.push(data.prediction);
                    updateLetterList();
                } else {
                    console.error('Erreur de prédiction');
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'appel à l\'API :', error);
            });
        });
    });

    // Finaliser et afficher le mot
    finalizeButton.addEventListener('click', () => {
        finalWordElement.textContent = capturedLetters.join('');
    });

    function updateLetterList() {
        letterList.innerHTML = '';
        capturedLetters.forEach(letter => {
            const li = document.createElement('li');
            li.textContent = letter;
            letterList.appendChild(li);
        });
    }
});
