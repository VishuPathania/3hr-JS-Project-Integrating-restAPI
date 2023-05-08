async function saveToLocalStorage(event) {
  try {  
      event.preventDefault();
      const candy = event.target.candy.value;
      const price = event.target.price.value;
      const description = event.target.description.value;
      const quantity = event.target.quantity.value;

      const expense = {
          candy: candy,
          price: price,
          description: description,
          quantity: quantity
      }

      const response = await axios.post("https://crudcrud.com/api/faa65c25ed3848ef987b193269348517/candyData", expense);
      console.log(response);
      showNewcandyOnScreen(response.data);
  } catch(err) {
      console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await axios.get("https://crudcrud.com/api/faa65c25ed3848ef987b193269348517/candyData");
      for (let i = 0; i < response.data.length; i++) {
        showNewcandyOnScreen(response.data[i]);
      }
  } catch(err) {
      console.log(err);
  }
});

function showNewcandyOnScreen(expense){
  document.getElementById('candy').value = '';
  document.getElementById('price').value = '';
  document.getElementById('description').value = '';
  document.getElementById('quantity').value = '';

  if(document.getElementById(expense.description) !== null){
    removeCandyFromScreen(expense.description);
  }

  const parentNode = document.getElementById('listofitems');
  const childElem = document.createElement('li');
  childElem.textContent = expense.candy + ' - ' + expense.price + ' - ' + expense.description + ' - ' + expense.quantity ;
  childElem.id = expense.description;
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('btn', 'btn-info', 'ml-2');
  editButton.addEventListener('click', () => {
    editCandyDetails(expense.candy, expense.price, expense.description, expense.quantity);
  });
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
  deleteButton.addEventListener('click', () => {
    deleteCandy(expense.description);
  });
  childElem.appendChild(editButton);
  childElem.appendChild(deleteButton);
  parentNode.appendChild(childElem);
}

// edit function

function editCandyDetails(candy, price, description, quantity) {
  document.getElementById('candy').value = candy;
  document.getElementById('price').value = price;
  document.getElementById('description').value = description;
  document.getElementById('quantity').value = quantity;

  deleteCandy(description);
}

//delete function

async function deleteCandy(description) {
  try{
    await axios.delete(`https://crudcrud.com/api/faa65c25ed3848ef987b193269348517/candyData/${description}`);
    removeCandyFromScreen(description);
  } catch(err){
    console.log(err);
  }
}

function removeCandyFromScreen(description){
  const childNodeToBeDeleted = document.getElementById(description);
  if(childNodeToBeDeleted){
    childNodeToBeDeleted.remove();
  }
} 
