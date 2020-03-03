function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "/pics/cd_catalog.xml", true);
    xmlhttp.send();
  }
  function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<tr><th>Artist</th><th>Title</th></tr>";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td></tr>";
    }

    document.getElementById("demo").innerHTML = table;
  }

  function unload() {
    console.log('ASASDASDASD');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        document.getElementById("demo").style.display = this.responseText;
      }
      
    };
    xmlhttp.open("GET", "/pics/text.txt", true);
    xmlhttp.send();
  }

  function pomidoro(time) {
    var seconds = 0;
    var interval;
    function pomodoro(mins) {   
        seconds = mins*60 || 0;       
        interval = setInterval(function() {
            seconds--;        
            if(!seconds){             
                clearInterval(interval);              
                alert("🚨 It is Cool 😎. I wish you could share ");        
        }   
    }, 1000)
}
};






  
 let form = document.forms["post"];

    function post() {
        console.log("dfeifje");
        let username  = document.getElementById('username').value;
        let message = document.getElementById('message').value;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          
        }
        
      };
    //   JSON.
        console.log(username);
      xmlhttp.open("POST", "/main", true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(JSON.stringify({username, message}));
      console.log(username);
    
  }