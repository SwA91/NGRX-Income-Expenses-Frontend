import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { AppState } from 'src/app/app.reducer';
import { TypeEntry, TypeStore } from 'src/app/enum/shared.enum';
import { EntryExit } from 'src/app/models/entry-exit.model';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {

  countEntry = 0;
  countExit = 0;
  totalExit = 0;
  totalEntry = 0;
  public doughnutChartLabels: string[] = [
    'Entries',
    'Exits',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  @ViewChild(BaseChartDirective) myDoughnut?: BaseChartDirective;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(TypeStore.ENTRY_EXIT).subscribe(({ items }) => {
      this.generateStatistic([...items]);
    });
  }

  generateStatistic(items: EntryExit[]) {
    this.resetAll();
    for (const item of items) {
      if (item.type === TypeEntry.ENTRY) {
        this.totalEntry += item.mount;
        this.countEntry++;
      } else {
        this.totalExit += item.mount;
        this.countExit++;
      }

    }

    this.doughnutChartData.datasets.push({
      data: [this.totalEntry, this.totalExit],
      backgroundColor: ['#36a2eb', '#ff6384']
    })

    if (!!this.myDoughnut) {
      this.myDoughnut.update();
    }
  }

  private resetAll() {
    this.countEntry = 0;
    this.countExit = 0;
    this.totalExit = 0;
    this.totalEntry = 0;
    this.doughnutChartData.datasets = []
  }

}
