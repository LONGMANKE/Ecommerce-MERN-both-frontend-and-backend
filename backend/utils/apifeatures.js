//maybe you want to get a product with a keyword maybe keyword = Samosa
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    // search a specific maybe http://localhost:5000/api/v1/products?keyword=product1 
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    //regex is regular expression dymestified
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            :
            {};
        //To give the feedback in the terminal initiate
        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr }
        //console.log(queryCopy)
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key])

        // Filter for rating and rating
        //console.log(queryCopy);

        //console.log(queryCopy );

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr));

        //  console.log(queryStr);
        return this;
    }

    pagination(resultPerPage) {
        // declaring the new wariable "currentPage" 
        const currentPage = Number(this.queryStr.page) || 1;

        //calculation of number of results to skip in a page so if it is page 3 
        // the skip will be 5 x (3-1) = skip 10 pages so display from 11-15 
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};

module.exports = ApiFeatures;