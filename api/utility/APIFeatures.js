class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  paginate() {
    const { page, limit } = this.queryObj;
    const limitNum = +limit || 3;
    const pageNum = +page || 1;
    const skip = limitNum * (pageNum - 1);
    this.query = this.query.skip(skip).limit(limitNum);
    //for the later calculation of total number of pages and the current page
    this.queryObj.pageNum = pageNum;
    this.queryObj.limitNum = limitNum;
    return this;
  }

  count() {
    this.query = this.query.countDocuments();
    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fieldsStr = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fieldsStr);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
}

module.exports = APIFeatures;
