const btnEl = document.getElementById('btn');
const errorMsg = document.getElementById('error');
const galleryEl = document.getElementById('gallery');

async function fetchImg() {
  const inputVal = document.getElementById('input').value;
  // console.log("clicked");
  if(inputVal>10 || inputVal <1){
    errorMsg.style.display = "block";
    errorMsg.innerText = "Number should be between 0 and 11";
    return;
  }
  imgs = "";
  try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(`https://api.unsplash.com/photos?per_page=${inputVal}&page=${Math.round(Math.random()*1000)}&client_id=waIDyXIsyUkgXg4HSdTFMDCygYoUnuE5etP-f0a97eQ`).then(
        (res) =>
          res.json().then((data) => {
            // console.log(data);
            if(data){
                data.forEach((pic)=>{
                    imgs += `<img src= ${pic.urls.small} alt = "image"/>`;
                    galleryEl.style.display = "block";
                    galleryEl.innerHTML = imgs;
                    btnEl.style.display = "block";
                    errorMsg.style.display = "none";
                })
            }
          })
      );
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "An error occured try again";
    btnEl.style.direction = "block";
    galleryEl.style.display = "none";
  }

}
btnEl.addEventListener('click', fetchImg);
