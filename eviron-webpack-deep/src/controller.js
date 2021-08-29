import model from "./model.js"
import view from "./view.js"

const controller = {
  async init(el) {
    this.el = el
    view.render(await model.get(), this.el)
  },
}

export default controller

if (module.hot) {
  console.log('핫 모듈 켜짐')

  // accept(감시할 모듈, 콜백 함수)
  module.hot.accept("./view.js", async () => {
    view.render(await model.get(), controller.el)
  })
}