import React, { Component } from 'react';
import '../css/search.css'

/* 
    the actual component which will consist the 
    drug realted data like name, realeasedate, diseases & description 
*/
class DrugData extends Component {

    constructor() {
        super();
        console.log("DrugData Construct");
    }

    // render drug card related information
    render() {
        return (
            <div className='drug_card'>
                <p className="drug_card_name">{this.props.details.name}</p>
                <p className="drug_card_released">Released Date: {this.props.details.released}</p>
                <p className="drug_card_disease">{this.props.details.diseases.join(', ')}</p>
                <p className="drug_card_description">{this.props.details.description}</p>
            </div>
        );
    }
}

export default DrugData;