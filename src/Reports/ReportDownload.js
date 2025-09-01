import jsPDF from 'jspdf'
import 'jspdf-autotable'
function exportPDF(report,treasaction){
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Approved Records",14,15);

    const tableColumn = [
        "ID",
        "Department",
        "Machine Code",
        "Type",
        "Description",
        "Employee",
        "Requested Date",
        "Approved Date"
    ]
    const tableRows = report.map(r =>[
        r.id,
        r.department,
        r.machine_code,
        r.type,
        r.description,
        r.employee_name,
        r.created_at || r.date_time,
        r.approved_date
        
    ])
    doc.autoTable({
        head:[tableColumn],
        body:tableRows,
        startY:20,
    })

    doc.text("Stock Records",14,doc.lastAutoTable.finalY+15);
    const tableColumn2 = [
        "ID",
        "Action",
        "Item ID",
        "Item Name",
        "Quantity",
        "Date Of Action"
    ]
    const tableRows2 = treasaction.map(r =>[
        r.id,
        r.action,
        r.item_id,
        r.item_name,
        r.quantity,
        r.date_of_accept,
        
        
    ])
    doc.autoTable({
        head:[tableColumn2],
        body:tableRows2,
        startY:doc.lastAutoTable.finalY+20,
    })





    doc.save("Report.pdf")
}
export default exportPDF