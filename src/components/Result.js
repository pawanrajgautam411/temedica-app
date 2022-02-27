import React, { Component } from 'react';
import DrugData from '../components/DrugData'


class Result extends Component {

    constructor() {
        super();
        console.log("Result Construct");
        this.createDrugHandler = this.createDrug.bind();
    }

    // create drug component
    createDrug(element, index) {
        return <DrugData
            key={index}
            details={element} />;
    }

    handleScroll(event) {
        console.log(event);
    }

    // create render component
    render() {

        // document.addEventListener('scroll', (event) => console.log(event));
        // debugger;
        const drugs = this.props.data.drugs;

        const filterdDrugs = drugs.filter(o1 => {
            return o1.name.toLowerCase()
                .includes(this.props.searchedText.toLowerCase());
        });

        console.log(this.props.searchedText);

        if (this.props.searchedText == undefined || this.props.searchedText === '') {
            return (
                <div id="no_results">No Results Found!</div>
            );
        } else {
            return (
                <div>
                    <div id="showing_results">Showing {filterdDrugs.length} Results</div>
                    <div  className="result">
                        {filterdDrugs.map((element, index) => this.createDrugHandler(element, index))}
                    </div>
                </div>
            );
        }



    }
}

export default Result;