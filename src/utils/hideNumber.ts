const hideNumber = (phone : number)=>{
    var a=[];
    var b;
    var c;
    var newString=[];
    let i=0;

    a = phone.toString().split('');
   
    a.splice(1,0,"X");
    a.splice(3,2,"X");
    a.splice(6,5,"X");
    a.splice(1,0,"X");
   
    
    return a;

    


}

export default hideNumber