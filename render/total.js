function renderTotalExpenses(data)
{
  const totalExpenses = document.getElementById("totalExpenses")

  let total = data.reduce((sum, item) => {
    return sum + item.amount
  }, 0)

  totalExpenses.textContent = new Intl.NumberFormat("id-ID").format(total)
}