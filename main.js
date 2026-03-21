document.addEventListener("DOMContentLoaded", () => {
  state = loadDataFromLS(state)

  function renderHighlighted() {
    if (lastAddedId && !addTimeout) {
      addTimeout = setTimeout(() => {
        lastAddedId = null
        addTimeout = null
        renderApp()
      }, 2000)
    }

    if (lastEditId && !editTimeout) {
      editTimeout = setTimeout(() => {
        lastEditId = null
        editTimeout = null
        renderApp()
      }, 2000)
    }
  }

  function renderApp(){
    toggleMainSection()
    
    if (state.expenses.length === 0) return

    const {filtered, paginated} = getProcessedData(state, uiState)

    toggleDataFiltered(filtered)

    const totalPages = Math.ceil(filtered.length / uiState.limit)

    renderCategory()
    renderTable(paginated)
    renderPagination(totalPages)
    renderTotalExpenses(filtered)
    renderHighlighted()
  }

  window.renderApp = renderApp

  renderApp()

  initCRUDHandlers()
  initPaginationHandlers()
  initSearchHandlers()
  initModalHandlers()
})