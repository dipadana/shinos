$(document).ready(() => {
  // food price handler
  $('#food_price').mask('000.000.000.000.000', { reverse: true })

  // DELETE request
  $('#delete-btn').on('click', (e) => {
    e.preventDefault()
    $target = $(e.target)
    const id = $target.attr('data-id')
    $.ajax({
      type: "DELETE",
      url: "/admin/menus/delete/" + id,
      success: () => {
        window.location.href = "/"
        alert('Deleting...')
      },
      error: (err) => {
        console.log(err)
      }
    })
  })
})