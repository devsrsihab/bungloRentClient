import html2canvas from "html2canvas"
import jsPDF from "jspdf"


export const checkoutToCanvas = (data) => {

    html2canvas(data)
    .then((canvas)=>{
        const imgData = canvas.toDataURL('image/png')
        const doc = new jsPDF()
        const pdfWidth = doc.internal.pageSize.getWidth()
        const pdfHeight = doc.internal.pageSize.getHeight()
        doc.addImage(imgData, 'PNG,JPEG,JPG,WEBP', 0, 0, pdfWidth, pdfHeight)

        doc.save('checkout.pdf')
    })
}