var FASHION_API_URL = 'https://fashion.recoqnitics.com/analyze'
var FACE_API_URL = 'https://face.recoqnitics.com/analyze'
var ACCESS_KEY = 'c9ec1698a897a6569361'
var SECRET_KEY = '206c238af1497d82c388e9508a22e4e7ee2b4560'
var SEARCH_URL = 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='

//Please edit the parameters above to suit your needs

function uploadPhoto() {
    var formData = new FormData(document.forms.namedItem('fileinfo'))   // do not change
    
    formData.append('access_key', ACCESS_KEY)
    formData.append('secret_key', SECRET_KEY)
    
    // Method 2: fetch Fashion API
    fetch(FASHION_API_URL, {
        method: 'POST',
        body: formData
    })
    .then(FASHIONresponse => {
        console.log(FASHIONresponse);
        return FASHIONresponse.json();
    })
    .then(FASHIONdata => {
        FASHIONdoSomethingWith(FASHIONdata);
        // Work with JSON data here
        //console.log(FASHIONdata);
    }).catch(err => {
        console.log("fashion error");
        // Do something for an error here
    });

    // Fetch Face API
    fetch(FACE_API_URL, {
      method: 'POST',
      body: formData
    })
    .then(FACEresponse => {
        return FACEresponse.json();
    })
    .then(FACEdata => {
        //console.log(data1);
        FACEdoSomethingWith(FACEdata);
        // Work with JSON data here
        //console.log(data);
    }).catch(err => {
        console.log("face error");
        // Do something for an error here
    });
}
    
function FASHIONdoSomethingWith(FASHIONdata) {

    var ratioArr = [];
    console.log(FASHIONdata.person.colors);
    
    for (let i = 0; i < FASHIONdata.person.colors.length; i++) {
        ratioArr.push(FASHIONdata.person.colors[i].ratio);   
    }

    var indexOfMaxValue = ratioArr.indexOf(Math.max(...ratioArr));
    
    var COLOR = FASHIONdata.person.colors[indexOfMaxValue].colorName.replace("_", "+");
    var GARMENT = FASHIONdata.person.garments[0].typeName;
    var SEARCH_TERM =  COLOR + "+" + GARMENT + "+" + GENDER;
    var URL = SEARCH_URL + SEARCH_TERM;


    document.write(" <strong> Styles detected: </strong> <br>")
    for (let index = 0; index < FASHIONdata.person.styles.length; index++) {
        document.write(FASHIONdata.person.styles[index].styleName);
        document.write("<br>");
    }
    document.write("<br>");
    document.write(" <strong> Colors detected: </strong> <br>")
    for (let index = 0; index < FASHIONdata.person.colors.length; index++) {
        document.write(FASHIONdata.person.colors[index].colorName.replace("_"," "));
        document.write("<br>");
    }
    document.write("<br>");
    document.write(" <strong> Garments detected: </strong> <br>")
    for (let index = 0; index < FASHIONdata.person.garments.length; index++) {
        document.write(FASHIONdata.person.garments[index].typeName);
        document.write("<br>");
    }
    document.write("<br>");

    // generate link
    console.log(FASHIONdata);
    console.log(COLOR);
    console.log(GARMENT);
    console.log(GENDER);
    document.write(URL);
    window.open("result.html", "_self");
}

function FACEdoSomethingWith(FACEdata){
  //console.log("HI")
  GENDER = FACEdata.faces[0].gender.value;
}

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};