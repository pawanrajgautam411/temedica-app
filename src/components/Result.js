import React, { Component } from 'react';
import DrugData from '../components/DrugData'
import loadedJsonData from './Search';
import FetchData from './ServerDummy';

/* 
    the Result component is used for 
    displaying the results in a specific div 
*/
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

        /* 
            fetch data is used for getting the 
            filtered data from server replica 
        */
        FetchData(this.set_state.bind(this), searchCriteria);

    }

    /* 
        creating only the DrugData component
    */
    createDrug(element, index) {
        return <DrugData
            key={index}
            details={element} />;
    }


    /* 
        lifecycle method from React component,
        used here for loading the data again if searched text changes
    */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchCriteria.searchedText != this.props.searchCriteria.searchedText) {
            // console.log("componentDidUpdate");
            FetchData(this.set_state.bind(this), this.props.searchCriteria);
            // console.log(this);
        }
    }

    /* 
        event handler for onClick of NextPage button,
        for handling next_page for server side pagination
    */
    handleNextPage() {
        let currentPage = this.state.searchCriteria.pageNumber + 1;
        let totalPages = this.state.totalRecords / this.state.searchCriteria.numberOfRecords;

        if (currentPage >= totalPages) {
            alert("No more data to display, try searching again");
            return;
        }

        let { searchedText, pageNumber, numberOfRecords } = this.props.searchCriteria;

        var newPageNumber = this.state.searchCriteria.pageNumber + 1;

        let searchedContent = {
            searchedText: searchedText,
            pageNumber: newPageNumber,
            numberOfRecords: numberOfRecords
        };

        // console.log(searchedContent);
        FetchData(this.set_state.bind(this), searchedContent);
    }


    /* 
        event handler for onClick of Previous Page button,
        handling previous page for server side pagination
    */
    handlePreviousPage() {
        // console.log(this.state.searchCriteria);

        let currentPage = this.state.searchCriteria.pageNumber;
        if (currentPage < 1) {
            alert("No more data to display, try searching again");
            return;
        }

        let { searchedText, pageNumber, numberOfRecords } = this.props.searchCriteria;

        var newPageNumber = this.state.searchCriteria.pageNumber - 1;

        let searchedContent = {
            searchedText: searchedText,
            pageNumber: newPageNumber,
            numberOfRecords: numberOfRecords
        };

        // console.log(searchedContent);
        FetchData(this.set_state.bind(this), searchedContent);
    }

    /* 
        setting the state from event handler like NextPage & PreviousPage,
        also on change of searched text.
    */
    set_state(data) {
        this.setState({
            searchCriteria: data.searchedContent,
            drugs: data.drugs,
            totalRecords: data.totalRecords
        });
    }

    /* 
        the default render method
    */
    render() {
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
        let totalPages = Math.ceil(totalRecords / searchCriteria.numberOfRecords);

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
                    <div id="showing_results">
                        <button id="previous_page" onClick={this.handlePreviousPage.bind(this)}>Previous Page</button>
                        Showing Results: Page {currentPage} of {totalPages}
                        <button id="next_page" onClick={this.handleNextPage.bind(this)}>Next Page</button>
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