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

const restaurants = await haeRavintolat();
teeRavintolaLista(restaurants);

sodexoButton.addEventListener('click', () => {
  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.company === 'Sodexo'
  );
  teeRavintolaLista(filteredRestaurants);
});

