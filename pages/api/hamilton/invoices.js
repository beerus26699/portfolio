import fs from 'fs';
import { jsPDF } from 'jspdf';

const baseFont = 10;

export default async function handler(req, res) {
    try {
        if (true) {
            const { technicians } = req.body;

            for (const property in technicians['Jeffrey Carter']) {
                const filename =
                    'Invoice_' + property.replace(' ', '-') + '.pdf';
                // const doc = new PDFDocument();
                // doc.pipe(fs.createWriteStream(`${filename}.pdf`));
                // // doc.rect(0, 0, 1000, 40).fill("#32889c");
                // doc
                //   .fillColor("black")
                //   .fontSize(20)
                //   .text("HAMILTON COMPANY INC", { align: "center" });
                // // doc.moveDown();

                // doc.fontSize(baseFont);
                // doc.text("39 Brighton Ave, Boston, MA 02134", { align: "center" });
                // doc.text("Mobile - +1 (617) 783-0039", { align: "center" });
                // doc.text("Website - thehamiltoncompany.com", { align: "center" });

                // doc.end();

                const doc = new jsPDF();
                // doc.setFontSize(20).text("HAMILTON COMPANY INC");
                // doc.save(filename);
                doc.html(
                    '<h1>Hello World</h1>',
                    {
                        callback: (doc) => {
                            doc.save(filename);
                        },
                    },
                    10,
                    10
                );
            }
            res.status(200).json({
                message: 'Hello from Next.js!',
                technicians,
            });
        } else if (slug === 'abc') {
        }

        return res.json({ message: 'success' });
    } catch (error) {
        return res.json({ error: error.message });
    }
}
