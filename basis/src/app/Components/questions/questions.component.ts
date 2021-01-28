import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

  interface FoodNode {
    name: string;
    children?: FoodNode[];
  }
  
  const TREE_DATA: FoodNode[] = [
    {
      name: 'Fruit',
      children: [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Fruit loops'},
      ]
    }, {
      name: 'Vegetables',
      children: [
        {name: 'Green'}, 
        {name: 'Orange'},
      ]
    },
  ];
  
  /** Flat node with expandable and level information */
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }
  
  /**
   * @title Tree with flat nodes
   */

  @Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
  })
  export class QuestionsComponent implements OnInit {
    flipped = false;
    imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkL8GlKZ775j3f0VVgS1rU8L2LoX5UEM6fKv_eGLzeza27WYH"
  
    flipIt() {
      this.flipped = !this.flipped;
    }
    ngOnInit() {
    }
    private _transformer = (node: FoodNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
      };
    }
  
    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);
  
    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);
  
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
    constructor() {
      this.dataSource.data = TREE_DATA;
    }
  
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  }

