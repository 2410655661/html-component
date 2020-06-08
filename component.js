const cssStyle = `
  .message-box {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
  }

  .message-box--body {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    width: 380px;
    height: 260px;
    background-color: #fff;
  }

  .message-box__title {
    margin: 0;
    font: 24px/60px normal;
    text-align: center;
    color: #0366d6;
    background-color: #eee;
  }

  .message-box__content {
    margin: 20px;
    font: 16px/26px normal;
    text-align: center;
    color: #333;
  }

  .message-box__group {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }

  .message-box__group .btn {
    overflow: hidden;
    box-sizing: border-box;
    border: 0;
    width: 50%;
    height: 60px;
    font-size: 18px;
    cursor: pointer;
  }

  .message-box__group .btn:focus {
    outline-color: transparent;
  }

  .message-box__group .sure-btn {
    float: left;
    color: #fff;
    background-color: #0366d6;
  }

  .message-box__group .cancel-btn {
    float: right;
    color: #333;
    background-color: #f3f3f3;
  }
`;

const template = `
  <button data-show>弹出弹框</button>
  <div class="message-box" data-hide>
    <div class="message-box--body">
      <h2 class="message-box__title">{{ title }}</h2>
      <p class="message-box__content">{{ content }}</p>
      <div class="message-box__group">
        <button class="btn sure-btn" data-sure>确定</button>
        <button class="btn cancel-btn" data-hide>取消</button>
      </div>
    </div>
  </div>
`;

class MessageBox extends HTMLElement {
  constructor() {
    super();
    this.generateDom();
    this.linkCss();
    this.render();
    this.addEvent();
  }

  generateDom () {
    const _default = {
      title: '默认的标题',
      content: '默认的内容'
    }
    const dataset = Object.assign({}, _default, this.dataset);

    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = template.replace(/\{\{\s*(\w+)\s*\}\}/g, (word, key) => dataset[key] || '');
  }

  linkCss () {
    const style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssStyle));
    this.shadow.appendChild(style);
  }

  render () {
    const container = document.createElement('div');

    container.innerHTML = this.template;
    this.shadow.appendChild(container)
  }

  addEvent () {
    addEvents(this.shadow, 'click', (event) => {
      const target = event.composedPath()[0];
      const dataset = target.dataset;

      for (let data in dataset) {
        this[data] && this[data](dataset[data]);
      }
    });
  }

  show () {
    this.messageBox = this.shadow.querySelector('.message-box');

    this.messageBox.style.display = 'block';
  }

  sure() {
    console.log('sure');
    this.hide();
  }

  hide () {
    this.messageBox && (this.messageBox.style.display = 'none');
  }
}

customElements.define('w-message-box', MessageBox);

function addEvents (target, event, executor) {
  if (document.addEventListener) {
    target.addEventListener(event, executor);
  } else {
    target.attachEvent(`on${event}`, executor);
  }
}
