function renderTable(data){
  const tbodyData = document.getElementById("tbodyData")
  const startIndex = (uiState.page - 1) * uiState.limit

  let html = ""

  data.forEach((e, i) => {
    html += `
      <tr class="${e.id === lastAddedId || e.id === lastEditId ? 'bg-gray-100' : ''}">
        <td>${startIndex + i + 1}</td>
        <td class="whitespace-nowrap">${e.name}</td>
        <td>${e.category}</td>
        <td>${new Intl.NumberFormat("id-ID").format(e.amount)}</td>
        <td class="whitespace-nowrap">
          <button data-id="${e.id}" class="edit bg-green-500 py-0.5 px-2 text-white rounded hover:bg-green-600">Edit</button>
          <button data-id="${e.id}" class="delete bg-red-500 hover:bg-red-600 text-white rounded py-0.5 px-2 ml-2">Delete</button>
          <button></button>
        </td>
      </tr>
    `

    tbodyData.innerHTML = html
  });
}