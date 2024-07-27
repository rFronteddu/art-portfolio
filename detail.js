document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageName = urlParams.get('image');
    
    if (!imageName) {
        document.getElementById('art-detail').textContent = 'No art specified.';
        return;
    }

    const artImage = document.getElementById('art-image');
    const artTitle = document.getElementById('art-title');
    const artDescription = document.getElementById('art-description');
    const artPrice = document.getElementById('art-price');

    artImage.src = `images/${imageName}.jpg`;

    fetch(`details/${imageName}.json`)
        .then(response => response.json())
        .then(data => {
            artTitle.textContent = data.title || 'Untitled';
            artDescription.textContent = data.description || 'No description available.';
            artPrice.textContent = data.price ? `Price: ${data.price}` : 'Price: N/A';
        })
        .catch(() => {
            artTitle.textContent = 'Untitled';
            artDescription.textContent = 'No description available.';
            artPrice.textContent = 'Price: N/A';
        });

    // Modal elements
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    artImage.addEventListener('click', () => {
        modalImage.src = artImage.src;
        modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
