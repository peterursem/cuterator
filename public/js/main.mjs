import { switchCropperFormat, destroyCropper } from './editor.mjs';
import { getPossibleFormats, addPage, addPhoto, clearPages, printPages } from './export.mjs';

var selectedFormat;
function formatSelected(format) {
  if (selectedFormat == format){
    return;
  }
  selectedFormat = format;
  clearPages();
  const existingSelection = document.querySelector('.selected'); 
  if (existingSelection) {
    existingSelection.classList.remove('selected');
  }
  document.getElementById(format).classList.add('selected');
  const existingCropper = document.querySelector('.cropper-canvas');
  if (existingCropper) {
    destroyCropper();
    document.querySelector('#editor img').remove();
  }
  switchCropperFormat(format);
}

getPossibleFormats()
.then(formats => {
  let i = 0
  formats.forEach(format => {
    let newButton = document.createElement('button');
    newButton.id = format.size;
    newButton.innerHTML = '<h1>' + format.size.replace('f', '') + '</h1> <a>' + format.desc + '</a> <img src="' + format.example + '">' ;
    newButton.onclick = function() {
      formatSelected(format.size);
    };
    document.getElementById('formatBar').appendChild(newButton);
    i++;
  });
  document.getElementById("formatBar").style.setProperty('--noFormats', i);
});

document.getElementById('addAll').addEventListener('click', () => {
  addPage(selectedFormat);
});
document.getElementById('addOne').addEventListener('click', () => {
  addPhoto(selectedFormat);
});
document.getElementById('clear').addEventListener('click', () => {
  clearPages();
});
document.getElementById('print').addEventListener('click', () => {
  printPages();
});
document.getElementById('rotateRight').addEventListener('click', () => {
  manualRotate(90);
});
document.getElementById('rotateLeft').addEventListener('click', () => {
  manualRotate(-90);
});