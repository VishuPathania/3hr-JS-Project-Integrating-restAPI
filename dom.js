async function saveToLocalStorage(event) {
  try {  
      event.preventDefault();
      const candy = event.target.candy.value;
      const price = event.target.price.value;
      const description = event.target.description.value;
      const quantity = event.target.quantity.value;
      //const id= 1;
       
      const obj = {
          candy: candy,
          price: price,
          description: description,
          quantity: quantity
          //id:candy
      }

      const response = await axios.post("https://crudcrud.com/api/eeea988d302e4e1fb3a2b3fc8543c7e5/candyData", obj);
      console.log(response);
      showNewCandyOnScreen(response.data);
  } catch(err) {
      console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await axios.get("https://crudcrud.com/api/eeea988d302e4e1fb3a2b3fc8543c7e5/candyData");
      for (let i = 0; i < response.data.length; i++) {
          //showNewCandyOnScreen(response.data[i]);
          await axios.delete(`https://crudcrud.com/api/eeea988d302e4e1fb3a2b3fc8543c7e5/candyData/${response.data[i]._id}`)
      }
  } catch(err) {
      console.log(err);
  }
});

function showNewCandyOnScreen(obj) {
  document.getElementById('candy').value = '';
  document.getElementById('price').value = '';
  document.getElementById('description').value = '';
  document.getElementById('quantity').value = '';

  if (document.getElementById(obj.description) !== null) {
      removeCandyFromScreen(obj.description);
  }

  const parentNode = document.getElementById('listofitems');
  const childElem = document.createElement('li');
  childElem.textContent = `${obj.candy} - ${obj.price} - ${obj.description} - ${obj.quantity}`;
  childElem.id = obj.description;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('btn', 'btn-info', 'ml-2');
  editButton.addEventListener('click', () => {
      editCandyDetails(obj.candy, obj.price, obj.description, obj.quantity);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
  deleteButton.addEventListener('click', () => {
      deleteCandy(obj.description);
  });

  childElem.appendChild(editButton);
  childElem.appendChild(deleteButton);
  parentNode.appendChild(childElem);
}

function editCandyDetails(candy, price, description, quantity) {
  document.getElementById('candy').value = candy;
  document.getElementById('price').value = price;
  document.getElementById('description').value = description;
  document.getElementById('quantity').value = quantity;

  deleteCandy(description);
}

async function deleteCandy(description) {
  try {
      await axios.delete(`https://crudcrud.com/api/eeea988d302e4e1fb3a2b3fc8543c7e5/candyData/${description}`);
      removeCandyFromScreen(description);
  } catch(err) {
      console.log(err);
  }
}

function removeCandyFromScreen(description) {
  const childNodeToBeDeleted = document.getElementById(description);
  if (childNodeToBeDeleted) {
      childNodeToBeDeleted.remove();
  }
}
