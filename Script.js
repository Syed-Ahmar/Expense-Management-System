//LogOut
function logOut() {
  localStorage.removeItem("currentUser")
  location.href = ""
}

//getting expense from local storage
let userExpense = localStorage.getItem("allExpenses")

//Expense Details if stored
if (userExpense == undefined) {
  userExpense = []
} else {
  userExpense = JSON.parse(userExpense)
}
//console.log(userExpense)

//getting expense category from local storage
let userCategory = localStorage.getItem("allCategories")

//Categore if stored
if (userCategory == undefined) {
  userCategory = []
} else {
  userCategory = JSON.parse(userCategory)
}
console.log(userCategory)


let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let usersData = JSON.parse(localStorage.getItem("usersData"))
let expDet = userExpense.filter(id => id.currentUserId == currentUser.userId)
let currentCategory = userCategory.filter(id => id.userId == currentUser.userId)

console.log(expDet)
console.log(currentCategory)


for (let i = 0; i < currentCategory.length; i++) {
  let categories = document.getElementById('expCat')
  let newOption = document.createElement('option')
  let optionText = document.createTextNode(currentCategory[i].category)
  newOption.appendChild(optionText)
  categories.appendChild(newOption);
}

//date method to store date automatically
var date = new Date()
var currentTime = date.toLocaleTimeString('en-Us')
currentDate = date.toLocaleDateString()

//variables to be used in object
let currentUserId = currentUser.userId
let expenseName;
let expenseDate;
let expenseAmount;
let category;

//WelCome Screen
let uName = " : " + currentUser.currentName
document.getElementById('welcomeNote').innerHTML = "Welcome To" + uName.toUpperCase()

//function to display add and done button
var expenseDetails = () => {
  document.getElementById("addExpenses").style.display = "block"
}

//function to add expenses
var expenseDetail;
let addExpense = () => {
  expenseName = document.getElementById("expenseName").value
  expenseAmount = document.getElementById("expenseAmount").value
  category = document.getElementById("expCat").value

  //object of expense Detail
  expenseDetail = {
    currentUserId: currentUserId,
    expenseId: Math.floor(Math.random() * 100001 + 10001),
    expCat: category,
    expense: expenseName,
    amount: expenseAmount,
    date: currentDate,
    time: currentTime
  }

  //pushing this detail to userexpense to store in local storage
  userExpense.push(expenseDetail);
  let newExpense = JSON.stringify(userExpense)
  localStorage.setItem("allExpenses", newExpense)


  //creating table of expenses at the time of adding
  showExpense();
  function showExpense() {
  var { expenseId, expCat, expense, amount, date, time } = expenseDetail
  var tableRow = document.createElement("tr")
  var idColumn = document.createElement("td")
  var idText = document.createTextNode(expenseId)
  idColumn.appendChild(idText)
  tableRow.appendChild(idColumn)

  var expCatColumn = document.createElement("td")
  var expCatText = document.createTextNode(expCat)
  expCatColumn.appendChild(expCatText)
  tableRow.appendChild(expCatColumn)

  var exenpseColumn = document.createElement("td")
  var exenpseText = document.createTextNode(expense)
  exenpseColumn.appendChild(exenpseText)
  tableRow.appendChild(exenpseColumn)

  var amountColumn = document.createElement("td")
  var amountText = document.createTextNode("Rs " + Number(amount) + "/-")
  amountColumn.appendChild(amountText)
  tableRow.appendChild(amountColumn)

  var dateColumn = document.createElement("td")
  var dateText = document.createTextNode(`${time} / ${date}`)
  dateColumn.appendChild(dateText)
  tableRow.appendChild(dateColumn)

  // EDIT BUTTON
  let buttonColumn1 = document.createElement("td")
  let button1 = document.createElement("button")
  let Edit = document.createTextNode(" Edit ")
  tableRow.appendChild(buttonColumn1);
  button1.appendChild(Edit);
  button1.onclick = function () {
    var currentID = editItem
    console.log(`CurrentID:${currentID}`)
    swal({
      title: 'Are You Sure?',
      text: "You Want to Edit Your Expense",
      type: 'warning',
      content: 'input',
      inputValue: expenseDetails,expenseName,
    }).then((result) => {
      console.log(result)
      if (result) {
        editItem(expenseDetails.expenseId, result);
					tableRow.cells[2].innerText = result;
					swal(
          'Edited!',
          'Your file has been changed.',
          'success'
        )
      } else {
        swal("Your Entry is unchanged!")
      }

    })
  }
  buttonColumn1.appendChild(button1);
  tableRow.appendChild(buttonColumn1);

  document.getElementById("expenseTable").appendChild(tableRow);
	swal("Expense Added Successfully","","success")
 

  function editItem(id, value){
    let current = id;
    for (let i = 0; i < expenseDetails.length; i++) {
      if (current == addExpense[i].expenseId) {
        let index = addExpense.indexOf(addExpense[i]);
        let expenseDetails = {
          currentUserId: currentUser[0].userId,
          expenseId: addExpense[i].expenseId,
          expenseName: value,
          expAmount: addExpense[i].expAmount,
          expCat: addExpense[i].expCat,
          time: addExpense[i].time,
          date:addExpense[i].date,
        }
        addExpense.splice(index, 1, expenseDetails);
        let deletedItem = JSON.stringify(addExpense);
        localStorage.setItem("addExpense", deletedItem);
      }
      
    }
    
  }

  // DELETE BUTTON
  let = expenseId
  let buttonColumn = document.createElement("td")
  let button = document.createElement("button")
  let del = document.createTextNode("Delete")
  button.className = "btn btn-danger"
  button.appendChild(del)
  button.onclick = function () {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this entry!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          tableRow.remove()
          swal
          ('Deleted!',
            "Your entry has been deleted!", {
            icon: "success",
          });

          // totalAmount();
        } else {
          swal("Your entry is safe!");
        }
      })
  }
  buttonColumn.appendChild(button)
  tableRow.appendChild(buttonColumn)

  document.getElementById("expenseTable").appendChild(tableRow)
  document.getElementById("expenseName").value = ""
  document.getElementById("expenseAmount").value = ""
  document.getElementById("expCat").value = ""

}
}



//By clicking on done, adding expense button will hide
let done = () => document.getElementById("addExpenses").style.display = "none"


//CODE TO DELETE ITEMS FROM LOCAL STORAGE
function deleteItem(ID) {
  var current = ID
  for (let i = 0; i < userExpense.length; i++) {
    if (current == userExpense[i].expenseId) {
      let index = userExpense.indexOf(userExpense[i])
      userExpense.splice(index, 1)
      let deletedItem = JSON.stringify(userExpense)
      localStorage.setItem("allExpenses", deletedItem)
      console.log(`index: ${index}`)
    }
  }
}


function newCategory() {
  swal({
  title:"Add New Category:",  
  content: "input",
  })
    .then((value) => {
      let newcategory = {
        userId: currentUserId,
        id: Math.floor(Math.random() * 100001 + 10001),
        category: value
      }
      userCategory.push(newcategory)
      let categories = document.getElementById('expCat')
      let newOption = document.createElement('option')
      let optionText = document.createTextNode(value)
      newOption.appendChild(optionText)
      categories.appendChild(newOption);
      setCategories(userCategory)
        swal("Category added Sucessfully!","","success")
    });
}

function setCategories(i) {
  let newCategory = i;
  localStorage.setItem("allCategories", JSON.stringify(newCategory))
}

//search by category option
let search = () => {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("expenseTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}


//creating table to display current expenses already stored
for (var a = 0; a < expDet.length; a++) {
  let tableRow = document.createElement("tr")
  let idColumn = document.createElement("td")
  let idText = document.createTextNode(expDet[a].expenseId)
  idColumn.appendChild(idText)
  tableRow.appendChild(idColumn)

  let expCatColumn = document.createElement("td")
  let expCatText = document.createTextNode(expDet[a].expCat)
  expCatColumn.appendChild(expCatText)
  tableRow.appendChild(expCatColumn)

  let exenpseColumn = document.createElement("td")
  var exenpseText = document.createTextNode(expDet[a].expense)
  exenpseColumn.appendChild(exenpseText)
  tableRow.appendChild(exenpseColumn)

  let amountColumn = document.createElement("td")
  let amountText = document.createTextNode("Rs " + Number(expDet[a].amount) + "/-")
  amountColumn.appendChild(amountText)
  tableRow.appendChild(amountColumn)

  let dateColumn = document.createElement("td")
  let dateText = document.createTextNode(`${expDet[a].time} / ${expDet[a].date} `)
  dateColumn.appendChild(dateText)
  tableRow.appendChild(dateColumn)

  // EDIT BUTTON
  let buttonColumn1 = document.createElement("td")
  let button1 = document.createElement("button")
  let Edit = document.createTextNode(" Edit ")
  tableRow.appendChild(buttonColumn1);
  button1.appendChild(Edit);
  button1.onclick = function () {
    swal({
      title: 'Are You Sure?',
      text: "You Want to Edit Your Expense",
      type: 'warning',
      content: 'input',
      inputValue: expenseDetails,expenseName,
    }).then((result) => {
      console.log(result)
      if (result) {
        editItem(expenseDetails.expenseId, result);
					tableRow.cells[2].innerText = result;
					swal(
          'Edited!',
          'Your Expense Is Edited.',
          'success'
        )
      } else {
        swal("Your Entry is unchanged!")
      }

    })
  }
  buttonColumn1.appendChild(button1);
  tableRow.appendChild(buttonColumn1);

  document.getElementById("expenseTable").appendChild(tableRow);
  

  function editItem(id, value){
    let current = id;
    for (let i = 0; i < expenseDetails.length; i++) {
      if (current == addExpense[i].expenseId) {
        let index = addExpense.indexOf(addExpense[i]);
        let expenseDetails = {
          currentUserId: currentUser[0].userId,
          expenseId: addExpense[i].expenseId,
          expenseName: value,
          expAmount: addExpense[i].expAmount,
          expCat: addExpense[i].expCat,
          time: addExpense[i].time,
          date:addExpense[i].date,
        }
        addExpense.splice(index, 1, expenseDetails);
        let deletedItem = JSON.stringify(addExpense);
        localStorage.setItem("addExpense", deletedItem);
      }
      
    }
    
  }

  let deleteId = expDet[a].expenseId
  let buttonColumn = document.createElement("td")
  let button = document.createElement("button")
  let del = document.createTextNode("Delete")
  button.className = "btn btn-danger"
  button.appendChild(del)
  button.onclick = function () {
    var currentID = deleteId
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this entry!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
          if (willDelete) {
            deleteItem(currentID)
            tableRow.remove()
          swal
          ('Deleted!',
            "Your entry has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your entry is safe!");
        }
      })
  }
  buttonColumn.appendChild(button)
  tableRow.appendChild(buttonColumn)

  document.getElementById("expenseTable").appendChild(tableRow)
  document.getElementById("expenseName").value = ""
  document.getElementById("expenseAmount").value = ""
  document.getElementById("expCat").value = ""	
}

 

