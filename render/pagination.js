function renderPagination(totalPages)
{
  const pagination = document.getElementById("pagination")

  if(totalPages <= 1){
    pagination.innerHTML = ""
    return
  }

  let options = ""

  for(let i = 1; i <= totalPages; i++)
  {
    options += `<option value="${i}" ${i === uiState.page ? "selected" : ""}>${i}</option>`
  }

  const isFirst = uiState.page === 1
  const isLast = uiState.page === totalPages

  pagination.innerHTML = `
    <button id="prevPage" class="text-sm md:text-base text-white rounded px-2 py-1 ${isFirst ? "bg-black/40 cursor-not-allowed" : "bg-black/80 hover:bg-black cursor-pointer"}">Prev</button>
        
    <div class="bg-white rounded overflow-hidden">
    <select id="pageSelect" class="text-sm md:text-base px-2 py-1 rounded cursor-pointer">${options}</select>
    <span class="text-sm md:text-base py-1 px-2 bg-gray-100">/ ${totalPages}</span>
    </div>

    <button id="nextPage" class="text-sm md:text-base text-white rounded px-2 py-1 ${isLast ? "bg-black/40 cursor-not-allowed" : "bg-black/80 hover:bg-black cursor-pointer"} cursor-pointer">Next</button>
  ` 
}