import '@fortawesome/fontawesome-free/js/fontawesome.min';
import 'startbootstrap-freelancer/vendor/jquery/jquery.min';
import 'startbootstrap-freelancer/vendor/jquery-easing/jquery.easing.min';
import 'startbootstrap-freelancer/vendor/bootstrap/js/bootstrap.bundle.min';
import data from './data/data';
import './assets/land-mini-1.jpg';
import './assets/land-mini-2.jpg';
import './assets/land-mini-3.jpg';
import './assets/land-mini-1-380w.jpg';
import './assets/airabella-logo.png';
import './assets/acha-logo.png';
import './assets/arribada-logo.png';
import './assets/fontela-logo.png';

/*
    Printers
 */
function printFamilies() {
    data.families.forEach(family => {
        const familiesRootDom = document.getElementById('families');
        familiesRootDom.appendChild(createFamilyHtml(family));
    });
}

function printFamily(familyId) {
    const family = data.families.filter(family => family.id === familyId)[0];
    const familiesRootDom = document.getElementById('families');
    changeTitle('Tierras de ' + family.name);

    family.ownedLands.forEach(land => {
        familiesRootDom.appendChild(createLandHtml(land, familyId));
    });
}

function printLand(landName, familyId) {
    changeTitle(landName);
    const landRootDOM = document.getElementById('families');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    const row = document.createElement('div');
    row.setAttribute('class', 'row');

    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('class', 'col-md-8');
    const pictureElement = document.createElement('picture');
    const firstSourceElement = document.createElement('source');
    firstSourceElement.setAttribute('media', '(min-width: 769px)');
    firstSourceElement.setAttribute('class', 'img-fluid');
    firstSourceElement.setAttribute('srcset', require('./assets/land2.png'));
    const secondSourceElement = document.createElement('source');
    secondSourceElement.setAttribute('media', '(max-width: 768px)');
    secondSourceElement.setAttribute('class', 'img-fluid');
    secondSourceElement.setAttribute('srcset', require('./assets/land2-mini.png'));
    const fallbackImage = document.createElement('img');
    fallbackImage.setAttribute('class', 'img-fluid');
    fallbackImage.setAttribute('src', require('./assets/land2.png'));
    fallbackImage.setAttribute('alt', landName + ' picture');
    pictureElement.appendChild(firstSourceElement);
    pictureElement.appendChild(secondSourceElement);
    pictureElement.appendChild(fallbackImage);
    imageDiv.appendChild(pictureElement);

    const descDiv = document.createElement('div');
    descDiv.setAttribute('class', 'col-md-4');
    const title = document.createElement('h3');
    title.setAttribute('class', 'my-3');
    title.innerText = 'Descripción';
    const pharagraph = document.createElement('p');
    pharagraph.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida ' +
        'pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, ' +
        'justo eu convallis placerat, felis enim.';

    descDiv.appendChild(title);
    descDiv.appendChild(pharagraph);

    row.appendChild(imageDiv);
    row.appendChild(descDiv);
    container.appendChild(row);

    container.appendChild(document.createElement('hr'));
    const otherSimilarLandsTitleDiv = document.createElement('div');
    otherSimilarLandsTitleDiv.setAttribute('class', 'my-4');
    const otherSimilarLandsTitle = document.createElement('h3');
    otherSimilarLandsTitle.innerText = 'Otras tierras de ' + getFamilyName(familyId);
    otherSimilarLandsTitle.setAttribute('class', 'text-uppercase text-secondary');
    otherSimilarLandsTitleDiv.appendChild(otherSimilarLandsTitle);

    const carousel = document.createElement('div');
    carousel.setAttribute('id', 'otherLandsCarousel');
    carousel.setAttribute('class', 'mt-2 carousel slide');
    carousel.setAttribute('data-ride', 'carousel');

    const similarLands = getSimilarLandsByFamily(landName, familyId);

    const carouselInner = document.createElement('div');
    carouselInner.setAttribute('class', 'carousel-inner');
    const carouselItem = document.createElement('div');
    carouselItem.setAttribute('class', 'carousel-item active');

    const carouselRow = document.createElement('div');
    carouselRow.setAttribute('class', 'row');
    similarLands.forEach((similarLand, i) => {
        const carouselCol = document.createElement('div');
        carouselCol.setAttribute('class', 'col-md-4');
        const carouselLandLink = document.createElement('a');
        carouselLandLink.setAttribute('href', '?land=' + similarLand + '&family=' + familyId);
        const carouselLandName = document.createElement('p');
        carouselLandName.setAttribute('style', 'color: black');
        carouselLandName.innerText = similarLand;
        const carouselImage = document.createElement('img');
        carouselLandLink.appendChild(carouselImage);
        carouselLandLink.appendChild(carouselLandName);
        carouselImage.setAttribute('src', require('./assets/land-mini-' + (i + 1) + '.jpg'));
        carouselImage.setAttribute('alt', similarLand);
        carouselImage.setAttribute('class', 'img-fluid mh-75');
        carouselImage.setAttribute('style', 'max-width: 100%');
        carouselCol.appendChild(carouselLandLink);
        carouselRow.appendChild(carouselCol);
    });
    carouselItem.appendChild(carouselRow);
    carouselInner.appendChild(carouselItem);
    carousel.appendChild(carouselInner);
    container.appendChild(otherSimilarLandsTitleDiv);
    container.appendChild(carousel);

    landRootDOM.appendChild(container);
}

function createLandHtml(land, familyId) {
    const column = document.createElement('div');
    column.setAttribute('class', 'col-md-6 col-lg-4');

    const portfolio = document.createElement('div');
    portfolio.setAttribute('class', 'portfolio-item mx-auto text-translation');
    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    let srcSet = require('./assets/land-mini-1.jpg') + ' 1138w, ' + require('./assets/land-mini-1-380w.jpg') + ' 380w';
    image.setAttribute('srcset', srcSet);
    image.setAttribute('src', require('./assets/land-mini-1.jpg'));
    image.setAttribute('alt', 'Family image');
    const landName = document.createElement('p');
    landName.innerText = land;
    portfolio.appendChild(image);
    portfolio.appendChild(landName);

    const link = document.createElement('a');
    link.setAttribute('href', '?land=' + encodeURI(land) + '&family=' + familyId);
    const portfolioItemCaption = document.createElement('div');
    portfolioItemCaption.setAttribute('class', 'portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100');

    const portfolioItemCaptionContent = document.createElement('div');
    portfolioItemCaptionContent.setAttribute('class', 'portfolio-item-caption-content text-center text-white');
    const icon = document.createElement('p');
    icon.setAttribute('class', 'text-bounce');
    icon.innerText = land;
    portfolioItemCaptionContent.appendChild(icon);

    portfolioItemCaption.appendChild(portfolioItemCaptionContent);
    link.appendChild(portfolioItemCaption);
    portfolio.appendChild(link);
    column.appendChild(portfolio);

    return column;
}

function createFamilyHtml(familyData) {
    const column = document.createElement('div');
    column.setAttribute('class', 'col-md-6 col-lg-4');

    const portfolio = document.createElement('div');
    portfolio.setAttribute('class', 'portfolio-item mx-auto');
    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    image.setAttribute('src', require('./' + familyData.image));
    image.setAttribute('alt', 'Family image');
    portfolio.appendChild(image);

    const link = document.createElement('a');
    link.setAttribute('href', '?family=' + familyData.id);
    link.innerHTML = '<span class="sr-only">Go to family</span>';
    const portfolioItemCaption = document.createElement('div');
    portfolioItemCaption.setAttribute('class', 'portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100');

    const portfolioItemCaptionContent = document.createElement('div');
    portfolioItemCaptionContent.setAttribute('class', 'portfolio-item-caption-content text-center text-white');
    const icon = document.createElement('span');
    icon.setAttribute('class', 'h1');
    icon.innerText = "+";
    portfolioItemCaptionContent.appendChild(icon);

    portfolioItemCaption.appendChild(portfolioItemCaptionContent);
    link.appendChild(portfolioItemCaption);
    portfolio.appendChild(link);
    column.appendChild(portfolio);

    return column;
}


/*
    Extract data
 */
function getSimilarLandsByFamily(currentLand, familyId) {
    const family = data.families.filter(family => family.id === familyId)[0];

    return family.ownedLands.filter(land => land !== currentLand);
}

function getFamilyName(familyId) {
    return data.families.filter(family => family.id === familyId)[0].name;
}

/*
    Utils
 */

function changeTitle(newTitle) {
    const title = document.getElementById('title');
    title.innerText = newTitle;
}

function getUrlVars() {
    let vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

const urlVars = getUrlVars();
if (urlVars.family && !urlVars.land) {
    const familyId = parseInt(urlVars.family);
    printFamily(familyId);
} else if (urlVars.land) {
    const landName = decodeURI(urlVars.land);
    const familyId = parseInt(urlVars.family);
    printLand(landName, familyId);
} else {
    printFamilies();
}
