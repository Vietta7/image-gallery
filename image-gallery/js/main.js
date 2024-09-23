document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const clientId = '2H1i68_lZidAefklFXl4KyR3HJFhcuM7WtfVyuLR50o'; 
    const randomUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=9`;
    const searchUrlBase = `https://api.unsplash.com/search/photos?client_id=${clientId}&per_page=9`;

    async function getRandomImages() {
        try {
            const response = await fetch(randomUrl);
            const data = await response.json();

            displayImages(data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    async function searchImages(query) {
        try {
            const searchUrl = `${searchUrlBase}&query=${query}`;
            const response = await fetch(searchUrl);
            const data = await response.json();

            displayImages(data.results);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    function displayImages(images) {
        gallery.innerHTML = '';

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.classList.add('gallery-img');
            imgElement.src = image.urls.small; 
            imgElement.alt = image.alt_description || 'Random image';

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.appendChild(imgElement);

            gallery.appendChild(galleryItem);
        });
    }

    // случайные изображения при загрузке страницы
    getRandomImages();

    // поиск, курсор ввода при загрузке страницы и крестик
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-icon');
    const clearBtn = document.getElementById('clearBtn');

    if (searchInput) {
        searchInput.focus();
    }

    searchInput.addEventListener('input', function() {
        if (searchInput.value.length > 0) {
            clearBtn.style.display = 'inline'; 
            searchIcon.style.display = 'none';
        } else {
            clearBtn.style.display = 'none'; 
            searchIcon.style.display = 'inline'; 
        }
    });

    clearBtn.addEventListener('click', function() {
        searchInput.value = ''; 
        searchInput.focus();
        clearBtn.style.display = 'none'; 
        searchIcon.style.display = 'inline';
        getRandomImages(); 
    });

    searchIcon.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchImages(query);
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchImages(query);
            }
        }
    });
});
