const PDFDocument = require('pdfkit');
const fs = require('fs');
const blobStream = require('blob-stream');
const { uploadPdfS3 } = require('./utils/s3image')

const header = "Receipt from Musical E learning"
const yStart = 350
const xStep = 50

const x1 = 20
const x2 = 140
const x3 = 300
const x4 = 400
const x5 = 500


const genInvoicePDF = async (pdfObjData, startDate, endDate, uniqTag) => {
  const doc = new PDFDocument({
    margins: {
      top: 20,
      bottom: 50,
      left: 20,
      right: 20
    }
  });
  const stream = doc.pipe(blobStream());
  doc.pipe(fs.createWriteStream('output.pdf'));

  doc.moveDown();

  doc.image('./logo.png', 230, 20, {
    fit: [150, 150]
  });
  doc.moveDown();
  doc.moveDown(10);
  doc.fontSize(25);
  doc.text(header, {
    align: 'center'
  })
  doc.moveDown();
  doc.fontSize(10);
  doc.text(`Receipt ID: #MEL - ${uniqTag}`, {
    align: 'center'
  })
  doc.fontSize(14);
  doc.text(`Invoice from ${startDate} to ${endDate}`, {
    align: 'center'
  })

  // doc.text('Instrument              Student                   Price/lesson              Amount                Total')

  doc.text('Instrument', x1, yStart - 50)
  doc.text('Student', x2, yStart - 50)
  doc.text('Amount', x3, yStart - 50)
  doc.text('Price/lesson', x4, yStart - 50)
  doc.text('Total', x5, yStart - 50)


  for (let i = 0; i < pdfObjData.length; i++) {
    doc.text(pdfObjData[i].instrument, x1, yStart + i * xStep, {
      lineBreak: false
    })

    doc.text(pdfObjData[i].studentFullName, x2, yStart + i * xStep, {
      lineBreak: false
    })

    doc.text(pdfObjData[i].amount, x3 + 40, yStart + i * xStep, {
      lineBreak: false
    })

    doc.text(`${pdfObjData[i].pricePerLesson}$`, x4 + 20, yStart + i * xStep, {
      lineBreak: false
    })

    doc.text(`${pdfObjData[i].pricePerLesson * pdfObjData[i].amount}$`, x5, yStart + i * xStep, {
      lineBreak: false
    })

    doc.moveDown()
  }
  doc.moveTo(20, yStart + 3 * xStep)
    .lineTo(580, yStart + 3 * xStep)
    .stroke();
  doc.fontSize(20);
  doc.text('Sub total', 20, yStart + 3 * xStep + 10)
  doc.text(`${pdfObjData[0].totalAmount}$`, x5, yStart + 3 * xStep + 10)
  doc.end();
  const invoiceUrl = await uploadPdfS3(doc, uniqTag)
  return invoiceUrl
}

module.exports = genInvoicePDF