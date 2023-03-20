async function saveToLocalStorage(event) {
    try {  
      event.preventDefault();
      const Expenseamount = event.target.Expenseamount.value;
      const Description = event.target.Description.value;
      const Category = event.target.Category.value;
  
      const obj = {
          Expenseamount,
          Description,
          Category
      }
      
        const Response = await axios.post("https://crudcrud.com/api/47c7aa359ef44932b715d5ddfcfc2130/expenseData",obj)
        console.log(Response)
        showNewExpensesOnScreen(Response.data)
      }catch(err){
        console.log(err)
      }
  
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
  
    try{
      const Response = await axios.get("https://crudcrud.com/api/47c7aa359ef44932b715d5ddfcfc2130/expenseData")
      for(var i=0;i<Response.data.length;i++){
          showNewExpensesOnScreen(Response.data[i])
      }
    }catch(err){
      console.log(err)
    }
  
  })
  
  function showNewExpensesOnScreen(expense){
    document.getElementById('Description').value = '';
    document.getElementById('Expenseamount').value = '';
    document.getElementById('Category').value = '';
    if(localStorage.getItem(expense.Description) !== null){
      removeExpensesFromScreen(expense.Description)
    }
  
    const parentNode = document.getElementById('TotalExpenses');
    const childHtml = `<li id=${expense._id}> ${expense.Expenseamount}-${expense.Description}-${expense.Category}
    <button onclick = deleteExpenses('${expense._id}') class = "btn btn-primary btn-sm">Delete </button>
<button onclick = editExpensesDetails('${expense.Description}','${expense.Expenseamount}','${expense.Category}','${expense._id}') class="btn btn-success btn-sm">Edit </button>

</li> `
  
    parentNode.innerHTML=parentNode.innerHTML+childHtml;
  }
  
  // edit function
  
  function editExpensesDetails(Descriptions,Expenseamount,Category,expenseId){
    document.getElementById('Description').value  = Descriptions;
    document.getElementById('Expenseamount').value = Expenseamount ;
    document.getElementById('Category').value = Category;
  
    deleteExpenses(expenseId)
  
  }
  
  
  //delete function
  
  async function deleteExpenses(expenseId){
    try{
      await axios.delete(`https://crudcrud.com/api/47c7aa359ef44932b715d5ddfcfc2130/expenseData/${expenseId}`)
      removeExpensesFromScreen(expenseId)
  
    }catch(err){
      console.log(err)
    }
  
  }
  
  function removeExpensesFromScreen(Descriptions){
    const parentNode = document.getElementById('TotalExpenses');
    const childNodeToBeDeleted = document.getElementById(Descriptions);
    if(childNodeToBeDeleted){
      parentNode.removeChild(childNodeToBeDeleted)
    }
  }