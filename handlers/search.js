function initSearchHandlers()
{
  const inputSearch = document.getElementById("inputSearch")
  const select = document.getElementById("select")
  const xSearch = document.getElementById("xSearch")
  const suggestions = document.getElementById("suggestions")
  const ul = suggestions.querySelector("ul")

  let activeIndex = -1

  function renderSuggestions(){
    const value = inputSearch.value.trim()

    uiState.keyword = value

    if(value === "")
    {
      xSearch.classList.add("hidden")
      suggestions.classList.add("hidden")
      uiState.keyword = ""
      ul.innerHTML = ""

      renderApp()
      return
    }

    const filtered = filterData(state.expenses, {
      ...uiState,
      keyword: value
    })

    let html = ""

    if (filtered.length === 0) {
      html = `<li class="no-data px-2 py-1 text-red-500 italic">Data tidak ditemukan</li>`
    } else {
      filtered.forEach(e => {
        const regex = new RegExp(`(${value})`, "gi")
        const highlighted = e.name.replace(regex, "<b>$1</b>")

        html += `<li class="px-2 py-1 cursor-pointer hover:bg-gray-200">${highlighted}</li>`
      })
    }

    ul.innerHTML = html
    suggestions.classList.remove("hidden")
  }

  inputSearch.addEventListener("input", () => {
    activeIndex = -1

    const value = inputSearch.value.trim()

    uiState.keyword = value
    uiState.page = 1

    if (value === "") {
      xSearch.classList.add("hidden")
      suggestions.classList.add("hidden")
      uiState.keyword = ""
      ul.innerHTML = ""
      renderApp()
      return
    }

    xSearch.classList.remove("hidden")

    renderSuggestions()
  })

  suggestions.addEventListener("click", (e) => {
    const li = e.target.closest("li")
    if (!li || li.classList.contains("no-data")) return

    inputSearch.value = li.textContent
    uiState.keyword = li.textContent
    uiState.page = 1

    suggestions.classList.add("hidden")

    renderApp()
  })

  inputSearch.addEventListener("keydown", (e) => {
    const items = ul.querySelectorAll("li:not(.no-data)")
    if (items.length === 0) return

    if (e.key === "ArrowDown") {
      activeIndex++
      if (activeIndex >= items.length) activeIndex = 0
    }

    if (e.key === "ArrowUp") {
      activeIndex--
      if (activeIndex < 0) activeIndex = items.length - 1
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        inputSearch.value = items[activeIndex].textContent
      }

      uiState.keyword = inputSearch.value
      uiState.page = 1

      suggestions.classList.add("hidden")
      renderApp()
    }

    if (e.key === "Escape") {
      suggestions.classList.add("hidden")
      activeIndex = -1
    }

    items.forEach(i => i.classList.remove("bg-gray-200"))

    if (activeIndex >= 0) {
      items[activeIndex].classList.add("bg-gray-200")
    }
  })

  xSearch.addEventListener("click", () => {
    inputSearch.value = ""
    uiState.keyword = ""
    uiState.category = ""
    uiState.page = 1

    select.value = ""
    xSearch.classList.add("hidden")
    suggestions.classList.add("hidden")

    renderApp()
  })

  select.addEventListener("change", () => {
    uiState.category = select.value
    uiState.page = 1
    renderApp()
  })

  document.addEventListener("click", (e) => {
    if (!inputSearch.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.classList.add("hidden")
    }
  })
}