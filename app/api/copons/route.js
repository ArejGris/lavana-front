import { PDFDocument,StandardFonts,rgb } from "pdf-lib";
export async function POST(req,res) {
    const {name}=await req.json()
    const pdfDoc=await PDFDocument.create()
    const timesRomanFont=await pdfDoc.embedFont(StandardFonts,timesRomanFont)
    const page=pdfDoc.addPage()
    const {width,height}=page.getSize()
    const fontSize=30
    page.drawText('hello world',{
        x:50,
        y:height- 4*fontSize,
        font:timesRomanFont,
        size:fontSize,
        color:rgb(0,0,0)
    })
    let v=0
    const pdfBytes=await pdfDoc.save()
    res.setHeader('Content-Type','application/json')
    res.setHeader('Content-Disposition',`attachment; filename=${v++}.pdf`)
}