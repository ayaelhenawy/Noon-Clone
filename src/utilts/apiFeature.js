


export class ApiFeature{
    constructor(mongooseQuery,searchQuery){
        this.mongooseQuery=mongooseQuery;
        this .searchQuery=searchQuery;
    }
    pagination(){
        let pageNumber=this.searchQuery*1||1
        if(this.searchQuery<0)pageNumber=1;
        const limit=2;
        let skip=(pageNumber-1)*limit
        this.mongooseQuery.skip(skip).limit(limit);
        this.pageNumber=pageNumber;
        return this;
    }


    filter(){
        
        let filterObj=structuredClone(this.searchQuery);
        filterObj=JSON.stringify(filterObj)
        filterObj=filterObj.replace(/(gt|gte|lt|lte)/g,(value)=>{
            return `$${value}`;
        })
        filterObj=JSON.parse(filterObj)
        console.log(filterObj);
        delete filterObj['page'];
        delete filterObj['sort']; 
        delete filterObj['search'];
        this.mongooseQuery.find(filterObj)
        return this;
    
    }


    sort(){
    if(this.searchQuery.sort){
        let sortBy=this.searchQuery.sort.split(',').join(' ');
        this.mongooseQuery.sort(sortBy);
    }
    return this;

    }


    fields(){
        if(this.searchQuery.fields){
            let selectedFields=this.searchQuery.fields.split(',').join(' ');
            console.log(selectedFields)
            this.mongooseQuery.select(selectedFields);
        }
        return this;
    }


    search(){
        if(this.searchQuery.search){
            this.mongooseQuery.find({
            $or:[
                {title:{$regex:this.searchQuery.search,$options:'i'}},
                {description:{$regex:this.searchQuery.search,$options:'i'}}
    
            ]
            }
            )
        }
        return this;
    }



}