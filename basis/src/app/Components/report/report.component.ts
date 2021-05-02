import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Services/report.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  chartReady = true;
  barChartOptions: ChartOptions = {
    responsive: true, scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          }
        }
      ]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
  ];
  constructor(private activatedRoute: ActivatedRoute, private ReportSer: ReportService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      myParam => {
        if (myParam['id'] == 1) {
          this.ReportSer.GetCountMounthLendReport().subscribe(myData => {})
            // this.ReportSer.reports= myData;
            // this.barChartLabels=Object.keys(this.ReportSer.reports);
            // this.barChartData.push({data:Object.values(this.ReportSer.reports),label:"computers usage",backgroundColor: "#3e95cd", })
            this.ReportSer.GetComputersUsageReport().subscribe(
              myData => {
                this.barChartLabels=new Array()
                let arrData=new Array();
                this.ReportSer.reports = myData;
                myData.forEach(element => {
                  this.barChartLabels.push(element.key)
                  arrData.push(element.value)
                });
               // this.barChartLabels = Object.keys(this.ReportSer.reports);
                this.barChartData.push({ data:arrData, label: "computers usage", backgroundColor: "#FF6600", hoverBackgroundColor: "#ff66007d"})
              },
              myErr => { console.log(myErr.message); });
          }
        
        else
        {
        if (myParam['id'] == 2) 
        {
          this.ReportSer.GetCountMounthLendReport().subscribe(myData => {
            this.ReportSer.reports = myData;
            this.barChartLabels = Object.keys(this.ReportSer.reports);
            this.barChartData.push({ data: Object.values(this.ReportSer.reports), label: "Monthly rental amount",backgroundColor: "#FF6600", hoverBackgroundColor: "#ff66007d" })
          }) 
         }
        }
      }
    )       
    }
}
  