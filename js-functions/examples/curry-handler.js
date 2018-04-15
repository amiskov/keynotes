class Button {
    constructor(id) {
        this.link = document.createElement('a')
        this.link.href = 'http://ya.ru'
        this.link.innerHTML = 'Hello'
        this.link.onclick = this.clickHandler('New Text')
    }

    clickHandler = newText => event => {
        event.preventDefault();
        this.link.innerHTML = (this.link.innerHTML == 'Hello') ? newText : 'Hello';
    }

    render() {
        return this.link
    }
}

document.getElementById('app').appendChild(new Button().render())
