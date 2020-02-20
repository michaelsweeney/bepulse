


class ReportSelect {
    constructor(props) {
        this.props = props;
        this.render()
        this.initListeners()
    }
    render() {
        this.props.container.innerHTML = `
            <select class='report-select selectpicker' data-live-search=true data-style = 'btn btn-light' data-width='auto'></select>

        `
        this.props.selector = this.props.container.querySelector('.report-select')
        // this.initBSSelect()
    }


    setOption(val) {

        this.props.container.querySelectorAll('option').forEach((opt) => {
            let tag = opt.innerHTML
            if (tag.replace(" ","") == val.replace(" ","")) {
                val = tag
            }
        })
        $(this.props.container.querySelector('.selectpicker')).selectpicker('val', val)
    }



    updateOptions(optionarray) {
        this.render()
        this.props.selector.innerHTML = optionarray.map((opt) => {
            return `
            <option>${opt}</option>
            `
        }).join('');

        this.initBSSelect()
        this.initListeners()

    }

    initBSSelect() {

        $(this.props.selector).selectpicker('')
    }

    initListeners() {
        let _this = this;

        function reportSelect(e, clickedIndex, isSelected, previousValue) {
            if (!clickedIndex) {
                e.stopImmediatePropagaion
                return
            }

            let key = _this.props.selector.querySelectorAll('option')[clickedIndex].value
            let custom = new CustomEvent('reportselect', {
                bubbles: true,
                detail: {
                    key: key
                }
            })
            _this.props.selector.dispatchEvent(custom)
        }

        $(this.props.selector).on('changed.bs.select', reportSelect)



    }

}





module.exports = {
    ReportSelect
}
