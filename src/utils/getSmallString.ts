const getSmallString=(str : string,x:number)=>{
    if(str.length>x){
        str =str.substring(0,x-1)+"...";
        return str;
    }
    else{
        return str
    }
}

export default getSmallString