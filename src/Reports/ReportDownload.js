import jsPDF from 'jspdf'
import 'jspdf-autotable'
function exportPDF(report){
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Approved Recods",14,15);

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
        
    ])
    doc.autoTable({
        head:[tableColumn],
        body:tableRows,
        startY:20,
    })

    doc.save("Report.pdf")
}
export default exportPDF