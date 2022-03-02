
/* 
    NOTE: this method is only acting as a replica to server calls
    and return back the data filtered on startingPoint, pageNo and number of records
 */
function FetchData(successCallbackFunc, searchedContent) {


    /* 
        Only filters the data for callback, acts as responsive service
    */
    const filterCallback = function (data) {

        const { searchedText, pageNumber, numberOfRecords } = searchedContent;

        if (searchedText == undefined || searchedText === "") {
            successCallbackFunc({
                searchedContent: searchedContent,
                drugs: [],
                totalRecords: 0
            });

            return;
        }

        const filterdDrugs = data.drugs.filter(o1 => {

            debugger;
            if (o1.name.toLowerCase().includes(searchedText.toLowerCase())) {
                // searching the searched text in name of the drug
                return true;
            
            } else {
                // searching the searched text in name of the drug
                var diseaseMatched = o1.diseases.find(str => {
                    if (str.toLowerCase().includes(searchedText.toLowerCase())) {
                        return true;
                    }
                });

                if (diseaseMatched != undefined && diseaseMatched.length > 0) { 
                    return true; 
                }
            }
        });

        if (pageNumber == undefined) {
            pageNumber = 0;
        }

        if (numberOfRecords == undefined) {
            numberOfRecords = 0;
        }

        let startingPoint = pageNumber * numberOfRecords;
        let endPoint = startingPoint + numberOfRecords;

        let finalList = filterdDrugs.slice(startingPoint, endPoint);

        console.log("finalList", finalList);

        successCallbackFunc({
            searchedContent: searchedContent,
            drugs: finalList,
            totalRecords: filterdDrugs.length
        });

    }

    /*
        fetchin only the json from dataset.json 
        provided in the assignment
    */
    const jsonData = fetch('data/dataset.json')
        .then(response => response.json())
        .then(filterCallback.bind(searchedContent));

}

export default FetchData;