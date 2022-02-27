import '../css/search.css'
import ReactDOM from 'react-dom';
import Result from './Result';


function Search() {

    // delaying the multiple 
    const debouce = function () {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                onSearchType.apply(this, args);
            }, 300);
        };
    }

    return (
        <div className="search">
            <h2>Search</h2>

            <input
                type="text"
                onChange={debouce(this)}
                placeholder="Enter drug name" />

        </div>
    );
}

const onSearchType = function (input) {
    const typedValue = input.target.value;
    // console.log(typedValue);

    const jsonData = fetch('data/dataset.json')
        .then(response => response.json())
        .then(loadedJsonData.bind({ typedValue: typedValue }));
}


// loading json data into Result Component
const loadedJsonData = function (data) {
    console.log(data);
    // console.log(this.typedValue);


    var resultComp = <Result
        searchedText={this.typedValue}
        data={data} />;


    var resultDomEle = document.getElementById('result');

    const scrollHandler = function (event) {
        if (this.resultDomEle.offsetHeight + this.resultDomEle.scrollTop >= this.resultDomEle.scrollHeight) {
            console.log("At Bottom")
        }
    };

    document.addEventListener('scroll', scrollHandler.bind({ resultDomEle }));

    ReactDOM.render(resultComp, resultDomEle);

    return data;
}

export default Search;