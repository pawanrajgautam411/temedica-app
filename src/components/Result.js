import React, { Component } from 'react';
import DrugData from '../components/DrugData'


class Result extends Component {

    constructor() {
        super();
    }

    // create drug component
    createDrug(element, index) {
        return <DrugData
            key={index}
            details={element} />;
    }

    // create render component
    render() {
        const drugs = this.props.data.drugs;

        const filterdDrugs = drugs.filter(o1 =>
            o1.name.includes(this.props.searchedText));

        console.log(this.props.searchedText);

        return (
            <div>
                {filterdDrugs.map((element, index) => this.createDrug(element, index))}
            </div>);

    }
}

export default Result;