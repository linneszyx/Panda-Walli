const imgcontainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let photosArray = [];

const count = 10;
const apikey = '_E0VveRwBuWURH7KzSzsfF61lUvS6Njm7xEpjmI7AHc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${_E0VveRwBuWURH7KzSzsfF61lUvS6Njm7xEpjmI7AHc}&count=${10}`;
function setAttributes(element, attributes) {
    for (const key in element) {
        setAttributes(key, attributes[key]);
    }
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        item.appendChild(img);
        imgcontainer.appendChild(item);
    });
}
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

getPhotos();
