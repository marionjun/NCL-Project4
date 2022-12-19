let perfumeContainer = document.getElementById("perfume")

// save your sheet ID and name of the tab as variables for use
let sheetID = "14hLT93JGTZnIX28jSLak_fJNz2aKeBpg_J6vXygj2t8";
let tabName = 'Sheet1'


let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`

console.log(opensheet_uri);


fetch(opensheet_uri)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
	

        let dataArr = [];

        for (let datapoint of data){

            let dataName = datapoint.name;
            let launchYear = parseFloat(datapoint.launch_year);
            let mainAccord = datapoint.main_accord;
            let topNote = datapoint.top_note;
            let intensity = parseFloat(datapoint.intensity);

            // console log the data to see what it looks like
            // console.log(dataName, launchYear, mainAccord, topNote, intensity);



            dataArr.push([dataName, launchYear, mainAccord, topNote, intensity]);


            let perfContainer = document.createElement("DIV");
            
            perfContainer.classList.add("bottle");

        }

        
        // console.log(dataArr);

        // Sort the data by launch year(newest to oldest)
        dataArr.sort(function(a, b) {
            return b[1] - a[1];
        }
        );

        // console.log(dataArr);

        // Loop through the data and create a div for each perfume
        for (let i = 0; i < dataArr.length; i++) {
            let perfContainer = document.createElement("DIV");
            
            perfContainer.classList.add("bottle");

            // Place dataName at the center of the div("bottle"), add styling to center the text(absolutely positioned)
            //
            perfContainer.innerHTML = `
            <span class="bottle__name">${dataArr[i][0]}</span>`;

            perfumeContainer.appendChild(perfContainer);

            // if intensity is 1, add the class "bottle--light" to the div
            if (dataArr[i][4] == 1) {
                perfContainer.classList.add("bottle--light");
            } else if (dataArr[i][4] == 2) {
                perfContainer.classList.add("bottle--medium");
            } else if (dataArr[i][4] == 3) {
                perfContainer.classList.add("bottle--strong");
            }

            if (dataArr[i][0] == "Rose of No Man's Land") {
                perfContainer.classList.add("rose");
            }

            if (dataArr[i][2] == "Floral") {
                perfContainer.classList.add("bottle--floral");
            } else if (dataArr[i][2] == "Woody") {
                perfContainer.classList.add("bottle--woody");
            } else if (dataArr[i][2] == "Fruity") {
                perfContainer.classList.add("bottle--fruity");
            }

            // Add image container to the bottle
            let imgContainer = document.createElement("DIV");
            imgContainer.classList.add("bottle__img-container");
            perfContainer.appendChild(imgContainer);
            
            // Create IMG element
            let imgElement = document.createElement("IMG");
            imgElement.classList.add("bottle__img");
            imgElement.src = `img/${dataArr[i][3]}.png`;
            // imgElement.src = `img/Image.png`;
            imgContainer.appendChild(imgElement);
        }

        

    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });



