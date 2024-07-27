document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');

    const images = [
        'image1.jpg',
        'image2.jpg'
        // Add more images here
    ];

    function loadDescription(imageName) {
        return fetch(`descriptions/${imageName}.txt`)
            .then(response => response.text())
            .catch(() => "No description available.");
    }

    function showImages() {
        images.forEach((image, index) => {
            const imageName = image.split('.').shift();

            loadDescription(imageName).then(description => {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');

                const imgElement = document.createElement('img');
                imgElement.src = `images/${image}`;
                imgElement.addEventListener('click', () => {
                    window.location.href = `detail.html?image=${imageName}`;
                });

                const descriptionElement = document.createElement('p');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = description;

                imageItem.appendChild(imgElement);
                imageItem.appendChild(descriptionElement);

                gallery.appendChild(imageItem);
            });
        });
    }

    showImages();
});
