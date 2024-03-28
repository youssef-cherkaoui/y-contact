const addButton = document.querySelector('.add-symbol');
    const popupWindow = document.querySelector('.blue-win');
    const closeButton = popupWindow.querySelector('.add-button');
    const popUp_form = popupWindow.querySelector('.popUp-form');   addButton.addEventListener('click', showPopup);
    
    closeButton.addEventListener('click', function(event) {
      hidePopup();
    });
  function showPopup() {
          popupWindow.style.display = 'block';
        }
      
        function hidePopup() {
          popupWindow.style.display = 'none';
        }