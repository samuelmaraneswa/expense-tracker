function filterData(data, uiState)
{
  return data.filter(e => {
    const matchKeyword = uiState.keyword === "" || e.name.toLowerCase().includes(uiState.keyword.toLowerCase())

    const matchCategory = uiState.category === "" || e.category.toLowerCase() === uiState.category.toLowerCase()

    return matchKeyword && matchCategory
  })
}

function paginateData(data, page, limit)
{
  const start = (page - 1) * limit
  const end = start + limit
  return data.slice(start, end)
}

function ensureValidPage(data){
  const totalPages = Math.ceil(data.length / uiState.limit)
  if(uiState.page > totalPages) uiState.page = totalPages || 1
  return totalPages
}

function getProcessedData(state, uiState)
{
  const filtered = filterData(state.expenses, uiState)
  ensureValidPage(filtered)
  const paginated = paginateData(filtered, uiState.page, uiState.limit)

  return{filtered, paginated}
}