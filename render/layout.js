function toggleMainSection() {
  const searchWrapper = document.getElementById("searchWrapper")
  const tableWrapper = document.getElementById("tableWrapper")
  const totalExpenseText = document.getElementById("totalExpensesText")
  const select = document.getElementById("select")
  const emptyMessage = document.getElementById("emptyMessage")

  if (state.expenses.length === 0) {
    emptyMessage.innerHTML = `<p class="italic text-red-500 text-sm">Data belum ada, tekan + untuk mengisi data!</p>`

    searchWrapper.classList.add("hidden")
    tableWrapper.classList.add("hidden")
    totalExpenseText.classList.add("hidden")
    select.classList.add("hidden")
    emptyMessage.classList.remove("hidden")
  } else {
    searchWrapper.classList.remove("hidden")
    tableWrapper.classList.remove("hidden")
    totalExpenseText.classList.remove("hidden")
    select.classList.remove("hidden")
    emptyMessage.classList.add("hidden")
  }
}

function toggleDataFiltered(data)
{
  const tableWrapper = document.getElementById("tableWrapper")
  const totalExpenseText = document.getElementById("totalExpensesText")
  const emptyMessage = document.getElementById("emptyMessage")

  if (data.length === 0)
  {
    tableWrapper.classList.add("hidden")
    totalExpenseText.classList.add("hidden")
    emptyMessage.classList.remove("hidden")
    emptyMessage.innerHTML = `<p class="text-center italic text-red-500 text-sm">Data tidak ada!</p>`
  } else {
    tableWrapper.classList.remove("hidden")
    totalExpenseText.classList.remove("hidden")
    emptyMessage.classList.add("hidden")
    emptyMessage.innerHTML = ""
  }
}