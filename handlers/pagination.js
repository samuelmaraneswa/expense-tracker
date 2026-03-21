function initPaginationHandlers()
{
  const pagination = document.getElementById("pagination")

  pagination.addEventListener("click", (e) => {
    if(e.target.tagName === "SELECT") return

    const {filtered} = getProcessedData(state, uiState)
    const totalPages = Math.ceil(filtered.length / uiState.limit)

    if(e.target.id === "prevPage" && uiState.page > 1)
    {
      uiState.page--
    }

    if(e.target.id === "nextPage" && uiState.page < totalPages)
    {
      uiState.page++
    }

    renderApp()
  })

  pagination.addEventListener("change", (e) => {
    if(e.target.id === "pageSelect")
    {
      uiState.page = Number(e.target.value)
      renderApp()
    }
  })
}