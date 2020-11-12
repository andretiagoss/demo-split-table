import jsPDF from 'jspdf';
import 'jspdf-autotable';

export class ReportComponent {

    exportarPDF(nomeArquivo: string, tituloRelatorio: string, colunas: string[], linhas: string[], orietacao: OrietacaoRelatorioPDF) {

        let pdf = null;

        if (orietacao == OrietacaoRelatorioPDF.Retrato)
            pdf = new jsPDF("portrait", "px", "a4");
        else
            pdf = new jsPDF("landscape", "px", "a4");

        pdf.setTextColor(100);
        pdf.page = 1;

        pdf.setFontSize(9);
        pdf.setFontStyle('bold');
        pdf.setFont("helvetica");

        this.setHeadPDF(tituloRelatorio, pdf, orietacao);

        pdf.autoTable({
            startY: 25,
            head: [colunas],
            body: linhas,
            styles: { fontSize: 7 }
        })

        this.setFooterPDF(pdf, orietacao);
        pdf.save(nomeArquivo + '.pdf');
    }

    setHeadPDF(tituloRelatorio: string, pdf: jsPDF, orietacao: OrietacaoRelatorioPDF) {
        if (orietacao == OrietacaoRelatorioPDF.Retrato)
            pdf.text(tituloRelatorio, 180, 16);
        else
            pdf.text(tituloRelatorio, 250, 16);
    }

    setFooterPDF(pdf: jsPDF, orietacao: OrietacaoRelatorioPDF) {

        const dataGeracaoRelatorio = new Date().toLocaleString();
        const pageCount = pdf.internal.getNumberOfPages();

        for (var i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            if (orietacao == OrietacaoRelatorioPDF.Retrato) {
                pdf.text(30, 600, "Marfrig");
                pdf.text(220, 600, dataGeracaoRelatorio);
                pdf.text(380, 600, "Página " + String(i) + " de " + String(pageCount));
            } else {
                pdf.text(30, 425, "Marfrig");
                pdf.text(300, 425, dataGeracaoRelatorio);
                pdf.text(550, 425, "Página " + String(i) + " de " + String(pageCount));
            }
        }
    }
}

export enum OrietacaoRelatorioPDF {
    Retrato,
    Paisagem
}
