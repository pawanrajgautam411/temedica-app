import '../css/search.css'
import ReactDOM from 'react-dom';
import Result from './Result';


function Search() {
    return (<div className="search">
        <h2>Search</h2>
        <input type="text" onChange={onSearchType.bind(this)} />
    </div>);
}

const onSearchType = function (input) {
    const typedValue = input.target.value;
    // console.log(typedValue);

    const jsonData = fetch('data/dataset.json')
        .then(response => response.json())
        .then(loadedJsonData.bind({ typedValue: typedValue }));
}

const loadedJsonData = function (data) {
    //console.log(data);
    // console.log(this.typedValue);

    ReactDOM.render(
        <Result
            searchedText={this.typedValue}
            data={data} />,
        document.getElementById('result'));

    return data;
}

export default Search;