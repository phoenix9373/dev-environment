const view = {
  render(data, el) {
    el.innerHTML = '<ol>' + data.map(item => {
      return `<li>${item.keyword}</li>`
    }).join('') + '</ol>'
  }
}

export default view