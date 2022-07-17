//maybe you want to get a product with a keyword maybe keyword = Samosa
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
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

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }
};

module.exports = ApiFeatures;