function renderCategory() {
  const select = document.getElementById("select")

  select.length = 1

  const categories = state.expenses
    .map(e => e.category)
    .filter((c, i, arr) => arr.indexOf(c) === i)

  categories.forEach(c => {
    const option = document.createElement("option")
    option.value = c
    option.textContent = c
    select.append(option)
  })

  select.value = uiState.category
}