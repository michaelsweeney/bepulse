

class Spinner {
    
    constructor(props) {
        this.props = props
        this.render()
    }
    render() {
        this.props.container.innerHTML = `
        <div class="loader"></div>
        `
    }
    
    active() {
        this.props.container.classList.remove('inactive')
        this.props.container.classList.add('active')
    }

    inactive() {
        this.props.container.classList.remove('active')
        this.props.container.classList.add('inactive')
    }
}

module.exports = { Spinner }