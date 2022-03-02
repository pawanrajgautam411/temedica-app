import '../css/search.css'
import ReactDOM from 'react-dom';
import Result from './Result';
import FetchData from './ServerDummy';


function Search() {

    // delaying the multiple 
    return (
        <div className="search">
            <h2>Search</h2>

            <input
                id = "search_box"
                type="text"
                onChange={debounce(this)}
                placeholder="Enter Drug or Disease name" />

        </div>
    );
}

const debounce = function (a1) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            onSearchType.apply(this, args);
        }, 300);
    };
}

const onSearchType = function (input) {
    const searchedText = input.target.value;

    const searchCriteria = {
        searchedText: searchedText,
        pageNumber: 0,
        numberOfRecords: 3
    }

    var resultComp = <Result
        searchCriteria={searchCriteria} />;

    var resultDomEle = document.getElementById('result');

    ReactDOM.render(resultComp, resultDomEle);
}

export default Search;