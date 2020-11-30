const getSmallString=(str : string)=>{
    if(str.length>20){
        str =str.substring(0,19)+"...";
        return str;
    }
    else{
        return str
    }
}

export default getSmallString