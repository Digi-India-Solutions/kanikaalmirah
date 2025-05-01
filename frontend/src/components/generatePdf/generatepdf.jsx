import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();
  const shipping = order.shippingAddress;


  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order.orderUniqueId}`, 14, 30);
  doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString("en-IN")}`, 14, 36);


  doc.setFont("helvetica", "bold");
  doc.text("Shipping Address:", 14, 46);
  doc.setFont("helvetica", "normal");
  doc.text(`${shipping.firstName} ${shipping.lastName}`, 14, 52);
  doc.text(`${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`, 14, 58);
  doc.text(`Phone: ${shipping.phone}`, 14, 64);
  doc.text(`Email: ${shipping.email}`, 14, 70);


  const headers = [["#", "Product", "Qty", "Price", "Total"]];
  const items = order.items.map((item, index) => {
    const product = item.productId;
    const total = (product.finalPrice * item.quantity).toFixed(2);
    return [
      index + 1,
      product.productName,
      item.quantity,
      `Rs. ${product.finalPrice?.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`,
      `Rs. ${parseFloat(total).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`,
    ];
  });

  autoTable(doc, {
    startY: 80,
    head: headers,
    body: items,
    headStyles: {
      fillColor: [22, 160, 133], 
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  const finalY = doc.lastAutoTable.finalY;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: Rs. ${order.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`, 14, finalY + 10);
  doc.text(`Payment Method: ${order.paymentMethod}`, 14, finalY + 16);
  doc.text(`Order Status: ${order.orderStatus}`, 14, finalY + 22);


  doc.save(`${order.orderUniqueId}.pdf`);
};
