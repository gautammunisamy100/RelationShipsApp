let data1 = [];
let data2 = [];
let people =[];
document.addEventListener('DOMContentLoaded', function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {    
           var jsonresponse = JSON.parse(this.responseText);          
            for( let prop in  jsonresponse){
             var r = jsonresponse[prop].ForName;
             var s =jsonresponse[prop].ToName;
             if(people.indexOf(r)<0){
                people.push(r);
             }
             if(people.indexOf(s)<0){
                  people.push(s);
             }
               var rindex = people.indexOf(r);
               var sindex = people.indexOf(s);
               data1.push(rindex);
               data2.push(sindex);
            }
            var optiontext="";
            for( let prop in  people){
                 optiontext +="<option value="+people[prop]+">"+people[prop]+"</option>\n"
            }
            var select1 = document.getElementById('selectpeople1');
            var select2 = document.getElementById('selectpeople2');
            select1.innerHTML = optiontext;
            select2.innerHTML = optiontext;
       };
    };
    xhttp.open("GET", "/allrelationship", true);
    xhttp.send();
}, false);

let finalpersonpath =[];
function myFunction(){
  var select1 = document.getElementById('selectpeople1').selectedIndex;
  var select2 = document.getElementById('selectpeople2').selectedIndex;
  var startperson = people.indexOf(document.getElementsByTagName("option")[select1].innerHTML);
  finalperson = people.indexOf(document.getElementsByTagName("option")[select2].innerHTML);
  if(startperson !=finalperson){
  finalpersonpath =[];
  functionpath(startperson,startperson.toString(),0,data1.length,finalperson);
  functionpath(finalperson,finalperson.toString(),0,data1.length,startperson);
  }else if(startperson == finalperson) {
    finalpersonpath =[startperson+"|"+finalperson];
  }
  CreatePath();
}

function functionpath(x,s,t,m,f){
  if(t>m && x != f){
       return;
  }if(x == f){
     finalpersonpath.push(s);
     return;
  }else{
    for(let h=t;h<data1.length;h++){
      let q=h+1;
      if(data1[h]==x){
        let s1 =s+"|"+data2[h];
         functionpath(data2[h],s1,q,m,f);
      }else if(data2[h]==x){
        let s2 =s+"|"+data1[h];
         functionpath(data1[h],s2,q,m,f);
      }
    }
    
  }
}

function CreatePath(){
  let totalpersonpathString = "";
  for(let prop in  finalpersonpath){
    let personpath = finalpersonpath[prop].split("|");
    let personpathstring ="";
    for( let u =0;u<personpath.length;u++){
      if(u == personpath.length-1){
      personpathstring += people[personpath[u]];
      }else{ 
       personpathstring += people[personpath[u]]+"->"; 
       } }
      totalpersonpathString+= personpathstring+ "<br>";
  }
  var pathheader = document.getElementById('peopleRelation');
  pathheader.innerHTML = totalpersonpathString;
  if(!totalpersonpathString){
       pathheader.innerHTML = "Sorry,No Relationship Path Found.";
  } 
} 