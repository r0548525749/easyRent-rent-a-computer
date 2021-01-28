import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/app/../assets/canvasjs.min';
import { Software } from 'src/app/Classes/software';
import { SoftwaresService } from 'src/app/Services/softwares.service';
import { ActivatedRoute } from '@angular/router';
import { inherits } from 'util';
import { TimesComputer } from 'src/app/Classes/times-computer';

@Component({
	selector: 'app-view-chart',
	templateUrl: './view-chart.component.html',
	styleUrls: ['./view-chart.component.css']
})

export class ViewChartComponent implements OnInit {
	Software: Software;
	softwareList: Array<Software>;
	dataPoints:any;
	constructor(private activatedRoute: ActivatedRoute, private softwareSer: SoftwaresService) { }
	ngOnInit() {
		this.activatedRoute.params.subscribe(
			
			myParam => {
				this.softwareSer.GetSoftwares().subscribe(
					myData => {
						this.softwareList = myData;
						// this.dataPoints=myData.map(x=>{return new {y:x.times, label:x.Name}()})

					},
					myErr => { console.log(myErr.message); });
			}
		)
		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Basic Column Chart in Angular"
			},
			data: [{
				type: "column",
				dataPoints: this.dataPoints
				
			}]

		});
		chart.render();
	}
	// ini(){
	// 	for (let index = 0; index < this.softwareList.length; index++) {


	// 	}
	// }
}
