import * as pdfParseModule from 'pdf-parse';

console.log("pdfParse type:", typeof pdfParseModule);
console.log("pdfParse keys:", Object.keys(pdfParseModule || {}));
console.log("pdfParse default type:", typeof pdfParseModule.default);
