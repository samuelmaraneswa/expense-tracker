let state = {
  expenses: []
}

let uiState = {
  keyword: "",
  category: "",
  page: 1,
  limit: 5
}

function loadDataFromLS(currentState)
{
  let expensesLocal = JSON.parse(localStorage.getItem("expenses"))

  if(expensesLocal)
  {
    return{
      ...currentState,
      expenses: expensesLocal.expenses
    }
  }else{
    return currentState
  }
}

function saveToLocalStorage(currentState)
{
  localStorage.setItem("expenses", JSON.stringify(currentState))
}

function setState(newState)
{
  state = newState
  saveToLocalStorage(state)
}