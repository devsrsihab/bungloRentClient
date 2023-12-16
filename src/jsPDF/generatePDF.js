import jsPDF from "jspdf";

// Function to generate PDF
export const  generatePDF = (data) => {
    const doc = new jsPDF();
  
    let yPos = 10;
    data.forEach((item, index) => {
      const { buildingtName, buildingImage, quantity, discount, sellingPrice, totalPrice } = item;
  
      // Add image
      if (buildingImage) {
        const imgData = buildingImage;
        doc.addImage(imgData, 'PNG,JPEG,WEBP,JPG', 15, yPos, 40, 40);
      }
  
      // Add text data
      doc.text(60, yPos + 10, `Building Name: ${buildingtName}`);
      doc.text(60, yPos + 20, `Quantity: ${quantity}`);
      doc.text(60, yPos + 30, `Discount: ${discount}%`);
      doc.text(60, yPos + 40, `Selling Price: $${sellingPrice}`);
      doc.text(60, yPos + 50, `Total Price: $${totalPrice}`);
  
      // Increase vertical position for the next item
      yPos += 70;
  
      // Add a new page for every 2 items (adjust this as needed)
      if ((index + 1) % 2 === 0) {
        doc.addPage();
        yPos = 10;
      }
    });
  
    // Save the PDF
   return  doc.save('checkout.pdf');
  }