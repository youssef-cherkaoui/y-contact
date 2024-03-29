//  D O M
const addButton = document.querySelector('.add-symbol');
const popupWindow = document.querySelector('.blue-win');
const closeButton = popupWindow.querySelector('.add-button');
const popUp_form = popupWindow.querySelector('.popUp-form');




// * * * * * * * E V E N T S * * * * * * *

    addButton.addEventListener('click', afficher);
    
    closeButton.addEventListener('click', function(event) {
      archiver();
    });


    // * * * * * * * F U N C T I O N  * * * * * * * 

        function afficher() {
          popupWindow.style.display = 'block';
        }
      
        function archiver() {
          popupWindow.style.display = 'none';
        }

        // * * * * * * * V A L I D A T I O N  * * * * * * *

        function validation(event) {
            const full_Name_input = popupWindow.querySelector("[name='full_name']");
            const phone_input = popupWindow.querySelector("[name='phone_number']");
            const email_input = popupWindow.querySelector("[name='email']");
            const address_input = popupWindow.querySelector("[name='address']");
        
            let fullName_valid = false;
            let tele_valid = false;
            let email_valid = false;
            let address_valid = false;
        
            if (full_Name_input.value !== "" && /^[A-Za-z]+$/.test(full_Name_input.value)) {
              fullName_valid = true;
            }
        
            let tele_pattern = /^[0-9]{10}$/;
            if (phone_input.value.match(tele_pattern)) {
              tele_valid = true;
            }
        
            let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email_input.value.match(email_pattern)) {
              email_valid = true;
            }
        
            if (address_input.value !== "") {
              address_valid = true;
            }
        
            if (fullName_valid === false || tele_valid === false || email_valid === false ||  address_valid === false) {

              event.preventDefault(); // STOP EVENT 

              console.log("Form validation failed.");
            } else {
               
              console.log("Form validation successful.");
              alert("test");
            }
          }

// * * * * * * * A P I  * * * * * * *


function CreerContactDiv(user) {
    const LISTSpaceAreaDOM = document.querySelector(".LISTSpaceArea");
    const newDivElement = document.createElement("div");
    newDivElement.classList.add("my-contact");
    newDivElement.innerHTML = `
      <div class="my-contact">
          <img class="person-img" src='${user.picture.large}' alt="myContact-image" style="width: 55px;">
          <div class="text">
              <p class="full-name">${user.name.first} ${user.name.last}</p>
              <p class="simple-message">Great! Keep up the good work</p>
              <p class="emailHidden" style="display: none;">${user.email}</p>
              <p class="teleHidden" style="display: none;">${user.phone}</p>
              <p class="addressHidden" style="display: none;">${user.location.country} ${user.location.city}</p>
              
          </div>
          <p class="message-time">10:35 pm</p>
      </div>
      `;
      LISTSpaceAreaDOM.appendChild(newDivElement);
  }

  async function getAndCreerContacts() {
    try {
        const response = await fetch("user.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.results.forEach(user => {
            CreerContactDiv(user);
        });
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error.message);
    }
}

getAndCreerContacts();

// * * * * * * * R E C H E R C H E * * * * * * *

function searchContacts(event) {
    event.preventDefault(); // Prevent form submission
    
    const searchInput = document.querySelector('#searchForm input[type="search"]');
    const searchQuery = searchInput.value.toLowerCase().trim(); // Get the search query and normalize it
    
    const contacts = document.querySelectorAll('.my-contact'); // Get all contacts
    
    contacts.forEach(contact => { 
        const fullName = contact.querySelector('.full-name').textContent.toLowerCase();
        const email = contact.querySelector('.emailHidden').textContent.toLowerCase();
        const phone = contact.querySelector('.teleHidden').textContent.toLowerCase();
        const address = contact.querySelector('.addressHidden').textContent.toLowerCase();
        
        // Check if any part of contact information matches the search query
        if (fullName.includes(searchQuery) || email.includes(searchQuery) || phone.includes(searchQuery) || address.includes(searchQuery)) {
            contact.style.display = 'block'; // Display the contact if it matches the search query
        } else {
            contact.style.display = 'none'; // Hide the contact if it doesn't match
        }
    });
}

// Add event listener to the search form
document.getElementById('searchForm').addEventListener('submit', searchContacts);


function BigProfil(div) {
    try {
        const fullName = div.querySelector('.name').textContent;
        const address = div.querySelector('.address').textContent;
        const tele = div.querySelector('.tele').textContent;
        const email = div.querySelector('.email').textContent;
        const imageUrl = div.querySelector('.profil-img').src;
        
        console.log('Full Name:', fullName);
        console.log('Address:', address);
        console.log('Telephone:', tele);
        console.log('Email:', email);
      
        // Mettre à jour les éléments d'affichage avec les données récupérées
        document.querySelector('.name').textContent = fullName;
        document.querySelector('.job').textContent = '';
        document.querySelector('.tele').textContent = tele;
        document.querySelector('.address').textContent = address;
        document.querySelector('.email').textContent = email; 
        document.querySelector('.image').src = imageUrl;
    } catch (error) {
        console.error('Error in BigProfil function:', error.message);
    }
}



