export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }


  filter() {
    let filterObj = structuredClone(this.searchQuery);

    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((field) => delete filterObj[field]);

    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj);

    this.mongooseQuery.find(filterObj);
    return this;
  }


  search() {
    if (this.searchQuery.search) {
      const searchTerm = this.searchQuery.search;
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { name: { $regex: searchTerm, $options: 'i' } } 
        ],
      });
    }
    return this;
  }


  sort() {
    if (this.searchQuery.sort) {
      const sortBy = this.searchQuery.sort.split(',').join(' ');
      this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  
  fields() {
    if (this.searchQuery.fields) {
      const selectedFields = this.searchQuery.fields.split(',').join(' ');
      this.mongooseQuery.select(selectedFields);
    } else {
      this.mongooseQuery.select('-__v');
    }
    return this;
  }


  pagination() {
    let pageNumber = this.searchQuery.page * 1 || 1;
    if (pageNumber <= 0) pageNumber = 1;

    const limit = this.searchQuery.limit * 1 || 10;
    const skip = (pageNumber - 1) * limit;

    this.mongooseQuery.skip(skip).limit(limit);
    this.pageNumber = pageNumber;
    this.limit = limit;

    return this;
  }
}
