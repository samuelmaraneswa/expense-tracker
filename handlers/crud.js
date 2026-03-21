const addBtn = document.getElementById("addData")
const nameInput = document.getElementById("name")
const categoryInput = document.getElementById("category")
const amountInput = document.getElementById("amount")
const saveBtn = document.getElementById("saveBtn")

let mode = "add"
let editId = null
let rawAmount = ""

let lastAddedId = null
let lastEditId = null
let addTimeout = null
let editTimeout = null

function generateId(currentState)
{
  return currentState.expenses.length ? Math.max(...currentState.expenses.map(e => e.id)) + 1 : 1
}

function addExpense(currentState, name, category, amount)
{
  const id = generateId(currentState)

  const newExpense = {id, name, category, amount}

  return {
    ...currentState,
    expenses: [newExpense, ...currentState.expenses]
  }
}

function updateExpense(currentState, id, name, category, amount)
{
  return {
    ...currentState,
    expenses: currentState.expenses.map(e => e.id === id ? {...e, name, category, amount} : e)
  }
}

function deleteExpense(currentState, id)
{
  return {
    ...currentState,
    expenses: currentState.expenses.filter(e => e.id !== id)
  }
}

function validateAddData(data) {
  let error = {}

  if (!data.name) {
    error.name = "Nama tidak boleh kosong!"
  }

  if (!data.category) {
    error.category = "Category tidak boleh kosong!"
  }

  if (data.amount === "") {
    error.amount = "Amount tidak boleh kosong!"
  } else if (Number(data.amount) <= 0) {
    error.amount = "Amount tidak boleh negatif!"
  } else if (Number.isNaN(data.amount)) {
    error.amount = "Amount harus berupa angka!"
  }

  return error
}

function renderErrorValidation(errors) {
  Object.entries(errors).forEach(([key, message]) => {
    const el = document.getElementById(`text-error-${key}`)
    if (el) el.textContent = message
  })
}

function initCRUDHandlers(){
  const tbodyData = document.getElementById("tbodyData")

  tbodyData.addEventListener("click", (e) => {
    const btnEdit = e.target.closest(".edit")
    const btnDelete = e.target.closest(".delete")

    if(btnDelete)
    {
      const id = Number(btnDelete.dataset.id)

      Swal.fire({
        title: "Yakin hapus?",
        text: "Data tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus"
      }).then(result => {
        if (result.isConfirmed) {
          const newState = deleteExpense(state, id)
          setState(newState)
          renderApp()

          Swal.fire({
            title: "Success",
            text: "Data berhasil dihapus",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          })
        }
      })
    }

    if(btnEdit)
    {
      const id = Number(btnEdit.dataset.id)

      const data = state.expenses.find(e => e.id === id)

      mode = "edit"
      editId = id

      nameInput.value = data.name
      categoryInput.value = data.category
      amountInput.value = new Intl.NumberFormat("id-ID").format(data.amount)

      rawAmount = data.amount

      openModal()
    }
  })

  amountInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    rawAmount = value
    e.target.value = new Intl.NumberFormat("id-ID").format(value)
  })

  addBtn.addEventListener("click", () => {
    mode = "add"
    editId = null

    nameInput.value = ""
    categoryInput.value = ""
    amountInput.value = ""

    openModal()
  })

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim()
    const category = categoryInput.value.trim()
    const amount = rawAmount

    document.querySelectorAll("[id^='text-error']").forEach(el => {
      el.textContent = ""
    })

    const data = {
      name,
      category,
      amount
    }

    const errors = validateAddData(data)

    if (Object.keys(errors).length !== 0) {
      renderErrorValidation(errors)
      return
    }

    data.amount = Number(data.amount)

    let newState;

    if (mode === "add") {
      newState = addExpense(state, data.name, data.category, data.amount)
      lastAddedId = newState.expenses[0].id
    } else {
      newState = updateExpense(state, editId, data.name, data.category, data.amount)
      lastEditId = editId
    }

    setState(newState)

    Swal.fire({
      title: "Success",
      text: mode === "add" ? "Data berhasil ditambahkan" : "Data berhasil diperbarui",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    })

    renderApp()

    nameInput.value = ""
    categoryInput.value = ""
    amountInput.value = ""

    mode = "add"
    editId = null

    closeModal()
  })
}