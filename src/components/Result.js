import React, { Component } from 'react';
import DrugData from '../components/DrugData'
import loadedJsonData from './Search';
import FetchData from './ServerDummy';


class Result extends Component {

    constructor(props) {
        super();
        console.log("Result Construct");
        this.createDrugHandler = this.createDrug.bind();

        let { searchCriteria } = props;

        this.state = {
            searchCriteria: searchCriteria,
            drugs: [],
            totalRecords: 0
        };

        FetchData(this.set_state.bind(this), searchCriteria);

    }

    getDrivedStateFromProps(props, state) {
        console.log("getDrivedStateFromProps", props, state);
    }

    // create drug component
    createDrug(element, index) {
        return <DrugData
            key={index}
            details={element} />;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchCriteria.searchedText != this.props.searchCriteria.searchedText) {
            // console.log("componentDidUpdate");
            FetchData(this.set_state.bind(this), this.props.searchCriteria);
            console.log(this);
        }
    }

    // handling next page
    handleNextPage() {
        console.log(this.state.searchCriteria);

        let currentPage = this.state.searchCriteria.pageNumber + 1;
        let totalPages = this.state.totalRecords / this.state.searchCriteria.numberOfRecords;

            if(currentPage >= totalPages){
            alert("no more data to display");
            return;
        }

        let { searchedText, pageNumber, numberOfRecords } = this.props.searchCriteria;

        var newPageNumber = this.state.searchCriteria.pageNumber + 1;

        let searchedContent = {
            searchedText: searchedText,
            pageNumber: newPageNumber,
            numberOfRecords: numberOfRecords
        };

        console.log(searchedContent);
        FetchData(this.set_state.bind(this), searchedContent);
    }

    // setting the state
    set_state(data) {
        this.setState({
            searchCriteria: data.searchedContent,
            drugs: data.drugs,
            totalRecords: data.totalRecords
        }, () => console.log("state has been set"));
    }

    // create render component
    render() {

        console.log("render called!", this.state);

        let { searchCriteria, drugs, totalRecords } = this.state;
        let { searchedText } = searchCriteria;

        if (searchedText == undefined || searchedText === '') {
            return (
                <div id="no_results">No Results Found!</div>
            );
        }

        if (drugs == undefined || drugs.length == 0) {
            return (
                <div id="no_results">No Results Found!</div>
            );
        }

        let currentPage = searchCriteria.pageNumber + 1;
        let totalPages = totalRecords / searchCriteria.numberOfRecords;

        if (totalPages < 1) {
            totalPages = 1;
        }

        if (drugs.length == totalRecords) {
            return (
                <div>
                    <div id="showing_results">Showing Results: Page {currentPage} of {totalPages}</div>
                    <div className="result">
                        {drugs.map((element, index) => this.createDrugHandler(element, index))}
                    </div>
                </div>
            );

        } else {
            return (
                <div>
                    <div id="showing_results">Showing Results: Page {currentPage} of {totalPages}
                        <a id="next_page" onClick={this.handleNextPage.bind(this)}>Next Page</a>
                    </div>
                    <div className="result">
                        {drugs.map((element, index) => this.createDrugHandler(element, index))}
                    </div>
                </div>
            );
        }
    }
}

export default Result;