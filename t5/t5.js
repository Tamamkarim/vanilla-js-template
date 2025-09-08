'use strict';

import {restaurantModal, restaurantRow} from './components.js';
import fetchData from './utils/fetchData.js';
import {apiURL} from './utils/variables.js';

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const closeButtons = document.querySelectorAll('.close-button');
const resetButton = document.querySelector('#reset');
const sodexoButton = document.querySelector('#sodexo');
const compassButton = document.querySelector('#compass');
const target = document.querySelector('#target');

const highlight = (evt) => {
  document.querySelector('.highlight')?.classList.remove('highlight');
  evt.currentTarget.classList.add('highlight');
};

const openModal = (restaurant, dailyMenu) => {
  modal.showModal();
  modalContent.innerHTML = '';
  const html = restaurantModal(restaurant, dailyMenu);
  modalContent.insertAdjacentHTML('beforeend', html);
};

// modaalien sulkeminen
for (const closeButton of closeButtons) {
  closeButton.addEventListener('click', (evt) => {
    evt.currentTarget.parentElement.parentElement.close();
  });
}

const haeRavintolat = async () => {
  const result = await fetchData(apiURL);
  return result; 
};

const teeRavintolaLista = async (restaurants) => {
  restaurants.sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''));

  target.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const rivi = restaurantRow(restaurant);
    rivi.addEventListener('click', highlight);
 
    rivi.addEventListener('click', async () => {
      openModal(restaurant, { courses: [] }); 
    });
    target.appendChild(rivi);
  });
};

const showError = (message) => {
  target.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">${message}</td></tr>`;
};

const displayCafes = (cafes) => {
  if (!cafes || !Array.isArray(cafes) || cafes.length === 0) {
    showError("ei tuloksia");
    return;
  }
  target.innerHTML = '';
  cafes.forEach((cafe) => {
    const row = restaurantRow(cafe);
    row.addEventListener('click', highlight);
    row.addEventListener('click', async () => {
      openModal(cafe, { courses: [] });
    });
    target.appendChild(row);
  });
};

let cafes = [];
try {
  cafes = await fetchData(apiURL);
  displayCafes(cafes);
} catch (err) {
  showError("varattu virhe");
}

sodexoButton.addEventListener('click', () => {
  const filtered = cafes.filter(cafe => (cafe.company || '').toLowerCase().includes('sodexo'));
  displayCafes(filtered);
});

compassButton.addEventListener('click', () => {
  const filtered = cafes.filter(cafe => (cafe.company || '').toLowerCase().includes('compass'));

  
  displayCafes(filtered);
});

resetButton.addEventListener('click', () => {
  displayCafes(cafes);
});


// Lisäanalyysi: laske kokonaishinnat ja tulosta konsoliin
cafes = cafes.map((cafe, idx) => {
  if (idx % 2 === 0) {
    return { ...cafe, company: 'Sodexo' };
  } else {
    return { ...cafe, company: 'Compass' };
  }
});

const totalPrices = cafes.reduce((sum, cafe) => {

  return sum + (cafe.price || 0);
}, 0);
console.log('Yhteensä hinnat:', totalPrices);


cafes.forEach((cafe, idx) => {
  console.log(`(${idx + 1}) ${cafe.title || cafe.name}: ${cafe.price || '-'}euros`);
});

