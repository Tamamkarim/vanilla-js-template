'use strict';

const restaurantRow = (restaurant) => {
  // استخدم خصائص بيانات القهوة
  const name = restaurant.title || restaurant.name || '-';
  const address = restaurant.description || restaurant.address || '-';
  const city = restaurant.ingredients ? restaurant.ingredients.join(', ') : (restaurant.city || '-');
  const company = restaurant.id || restaurant.company || '-';

  const rivi = document.createElement('tr');

  const nimiSolu = document.createElement('td');
  nimiSolu.innerText = name;

  const osoiteSolu = document.createElement('td');
  osoiteSolu.innerText = `${address} ${city}`;

  const firmaSolu = document.createElement('td');
  firmaSolu.innerText = company;

  rivi.append(nimiSolu, osoiteSolu, firmaSolu);

  return rivi;
};

const restaurantModal = (restaurant, menu) => {
  // استخدم خصائص بيانات القهوة
  const name = restaurant.title || restaurant.name || '-';
  const address = restaurant.description || restaurant.address || '-';
  const postalCode = restaurant.id || '-';
  const city = restaurant.ingredients ? restaurant.ingredients.join(', ') : (restaurant.city || '-');
  const phone = restaurant.id || '-';
  const company = restaurant.company || '-';
  let html = `
      <h3>${name}</h3>
      <address>
        ${address}<br>
        ${postalCode} ${city} <br>
        ${phone} <br>
        ${company}
      </address>
    `;
  html += `
    <table>
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Hinta</th>
          <th>Allergeenit</th>
        </tr>
      </thead>
      <tbody>`;
  // لا توجد بيانات قائمة حقيقية في بيانات القهوة
  html += `</tbody></table>`;
  return html;
};

export {restaurantRow, restaurantModal};
