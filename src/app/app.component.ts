import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
//import { jsPDF } from "jspdf";
import jsPDF from 'jspdf'; //versão 1.4.1
import { OrietacaoRelatorioPDF, ReportComponent } from './reports/report.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title: string; 

  @ViewChild("pdfTable", { static: false }) pdfTable: ElementRef;

  public listProducts: Product[] = [];

  constructor(
    private report:ReportComponent
    ){}

  ngOnInit(){
    this.title = 'demo-table';
    this.loadList();
  }

  loadList(){
    for (let i = 1; i <= 100; i++) {
      let product = {
        id:i,
        name:"Produto sdfasfas fefa re r gwwr " + i
      };
      this.listProducts.push(product);
    }
  }

  exportPDF(){
    const doc = new jsPDF();

    const specialElementHandlers = {
      "#editor": function(element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers
    });

    /*Inject page number after html rendering*/ 
    addFooters(doc);

    //Generate PDF
    doc.save("tableToPdf.pdf");
    
    //Generate PDF and send to printer
    // doc.autoPrint();
    // window.open(doc.output('bloburl'));
    
    //Send to printer
    //window.print();
  }

  exportPDF2(){
    const columns = ["ID", "Nome"];

    const rows = [];

    this.listProducts.forEach(item => {
      const row = [];
      row.push(item.id, item.name);
      rows.push(row);
    });

    this.report.exportarPDF('produto','Relatório de Produtos', columns, rows, OrietacaoRelatorioPDF.Retrato);
  }
}

const addFooters = doc => {
  const pageCount = doc.internal.getNumberOfPages();

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    
    doc.text(
      "Page " + String(i) + " to " + String(pageCount),
      doc.internal.pageSize.width / 2,
      287,
      {
        align: "center"
      }
    ); 
  }
};

interface Product {
  id: number;
  name: string;
}
