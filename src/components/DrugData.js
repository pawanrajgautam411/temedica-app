import React, { Component } from 'react';
import '../css/drug_card.css'

class DrugData extends Component {

    constructor() {
        super();
    }


    render() {
        return (<div className='drug_card' >
            <p className="drug_card_name">{this.props.details.name}</p>
            <p className="drug_card_released">{this.props.details.released}</p>
            <p className="drug_card_description">{this.props.details.description}</p>
        </div>);
    }
}

export default DrugData;