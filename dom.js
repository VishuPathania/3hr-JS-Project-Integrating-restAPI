
function savetoLocalStorage(event){
  event.preventDefault();
  const candy = event.target.candy.value;
  const price = event.target.price.value;
  const description = event.target.description.value;
  const quantity = event.target.quantity.value;
  
  const obj= {
    candy: candy,
    price: price,
    description: description,
    quantity: quantity
  }

  //store in local storage with key as candy
  localStorage.setItem(obj.candy, JSON.stringify(obj))

  showcandyonScreen(obj) 
}

function showcandyonScreen(obj) {
  const parentElem = document.getElementById('listofitems') //create li tag also for new details
  const childElem = document.createElement('li')
  childElem.textContent= obj.candy + ' - ' + obj.price + ' - ' + obj.description + ' - ' + obj.quantity ;
  parentElem.appendChild(childElem)
 
  //Adding delete button and functionality DOM 
  const delBtn= document.createElement('input')
  delBtn.type = "button"
  delBtn.style.color= "red"
  delBtn.style.backgroundColor= "cherry"
  delBtn.value = 'Delete'
  delBtn.onclick = () => {
      localStorage.removeItem(obj.candy)
      parentElem.removeChild(childElem)
  }
   
 
   //Adding EDIT button and functionality DOM 14
   //We will just delete from li and populate in input

  const editBtn= document.createElement('input')
  editBtn.type = "button"
  editBtn.style.color= "blue"
  editBtn.style.backgroundColor= "yellow"
  editBtn.value = 'Edit'
  editBtn.onclick = () => {
      localStorage.removeItem(obj.candy)
      parentElem.removeChild(childElem)
      document.getElementById('candy').value = obj.candy;
      document.getElementById('price').value = obj.price;
      document.getElementById('description').value = obj.description;
      document.getElementById('quantity').value =obj.quantity;
  }
  
  childElem.appendChild(delBtn)
  childElem.appendChild(editBtn)
  parentElem.appendChild(childElem)
}
