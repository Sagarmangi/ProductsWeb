const selectElement = document.getElementById('type');
const dvd = document.getElementById('dvd');
const furniture = document.getElementById('furniture');
const book = document.getElementById('book');
const size = document.getElementById('size');
const weight = document.getElementById('weight');
const furnitureAttr = document.querySelectorAll('.furnitureAtt');

function furnitureReq(option) {
  for (let i = 0; i < furnitureAttr.length; i++) {
    furnitureAttr[i].required = option;
  }
}

function displayReq(dvdDisp, dvdSize, furnDisp, furnDim, bookDisp, bookWeight) {
  dvd.style.display = dvdDisp;
  size.required = dvdSize;
  furniture.style.display = furnDisp;
  furnitureReq(furnDim)
  book.style.display = bookDisp;
  weight.required = bookWeight;
}

// DROP DOWN MENU FOR ITEM TYPE
selectElement.addEventListener('change', (event) => {
if (event.target.value === 'dvd') {
  displayReq('block', true, 'none', false, 'none', false);
} else if (event.target.value === 'furniture') {
  displayReq('none', false, 'block', true, 'none', false);
} else if (event.target.value === 'book'){
  displayReq('none', false, 'none', false, 'block', true);
} else {
  displayReq('none', false, 'none', false, 'none', false);
}
});
