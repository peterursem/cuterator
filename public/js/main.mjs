import { jsPDF } from '/js/jspdf.es.min.js';

const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11]
});

doc.setFontSize(12);
doc.text("Peter's Cut-Erator", 1, 1, {'angle': 270});

doc.save('test.pdf');