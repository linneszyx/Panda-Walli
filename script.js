/* Getting the element with the id `img-container` and storing it in the variable `piccontain`. */
const piccontain = document.getElementById('img-container');
/* Getting the element with the id `loader` from the HTML file. */
const loader = document.getElementById('loader');

/* A variable that is set to false. */
let ready = false;
/* Setting the variable `imagesLoaded` to 0. */
let imagesLoaded = 0;
/* Setting the variable `totalImages` to 0. */
let totalImages = 0;
/* Creating an empty array. */
let photosArray = [];
/* Setting the variable `count` to 10. */
let count = 30;
/* Setting the variable `apiKey` to the value `d7gSfkiywZ8NsS1NQInOCgjqojSph_0Uf845i1sRpv4`. */
const apiKey = 'd7gSfkiywZ8NsS1NQInOCgjqojSph_0Uf845i1sRpv4';

/**
 * If the number of images loaded is equal to the total number of images, then the game is ready to
 * start.
 */
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
    }

}
/**
 * This function takes an element and an object of attributes and sets the attributes on the element.
 * @param element - The element you want to add the attributes to.
 * @param attributes - an object containing the attributes to set.
 */
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/**
 * The function loops through the photosArray and creates an anchor element for each photo. 
 * 
 * The anchor element is given an href attribute that links to the photo's html page. 
 * 
 * The anchor element is also given a target attribute that opens the link in a new tab. 
 * 
 * The anchor element is then given an image element. 
 * 
 * The image element is given a src attribute that links to the photo's regular size image. 
 * 
 * The image element is also given an alt attribute that contains the photo's alt description. 
 * 
 * The image element is also given a title attribute that contains the photo's description. 
 * 
 * The image element is then given an event listener that calls the imageLoaded function when the image
 * loads. 
 * 
 * The image element is then appended to the anchor element. 
 * 
 * The anchor element is then
 */
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const image = document.createElement('img');

        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.description
        });
        image.addEventListener('load', imageLoaded);
        item.appendChild(image);
        piccontain.appendChild(item);
    })
}
/**
 * The getPhotos function is an asynchronous function that fetches the photos from the Unsplash API and
 * displays them on the page.
 */
async function getPhotos() {
    try {
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        count = 20;

    } catch (error) {

    }
}
/* Listening for the scroll event. When the scroll event occurs, it checks to see if the
window's scroll position plus the window's inner height is greater than or equal to the document's
body's offset height minus 1000. If it is, then it sets the variable `ready` to false and calls the
function `getPhotos`. */
window.addEventListener('scroll', () => {

    if ((window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) && ready) {

        ready = false;
        getPhotos();
    }
});

/* Calling the function `getPhotos`. */
getPhotos();