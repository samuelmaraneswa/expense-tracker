const modal = document.getElementById("modalAddData")
const modalContent = document.getElementById("modalContent")
const closeBtn = modal.querySelector(".fa-x")

function openModal()
{
  modal.classList.remove("opacity-0", "pointer-events-none")
  modalContent.classList.remove("scale-95")
}

function resetError() {
  document.querySelectorAll("[id^='text-error']").forEach(el => {
    el.textContent = ""
  })
}

function closeModal()
{
  modal.classList.add("opacity-0", "pointer-events-none")
  modalContent.classList.add("scale-95")

  resetError()
}

function initModalHandlers()
{
  closeBtn.addEventListener("click", closeModal)

  modal.addEventListener("click", (e) => {
    if(!modalContent.contains(e.target)){
      closeModal()
    }
  })
}