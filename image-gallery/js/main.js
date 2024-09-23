// получаем рандомные изображения при загрузке странице

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const clientId = '2H1i68_lZidAefklFXl4KyR3HJFhcuM7WtfVyuLR50o'; 
    const url = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=9`;

    async function getRandomImages() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            gallery.innerHTML = '';

            data.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.classList.add('gallery-img');
                imgElement.src = image.urls.small; 
                imgElement.alt = image.alt_description || 'Random image';

                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.appendChild(imgElement);

                gallery.appendChild(galleryItem);
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    getRandomImages();
});

// поиск, курсор ввода при загрузке страницы и крестик

window.onload = function() {
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
    });
};
