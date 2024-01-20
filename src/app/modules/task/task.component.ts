import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  isBuscarButtonActive: boolean = true;
  isBuscarAvzButtonActive: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  toggleBuscarButton(): void {
    this.isBuscarButtonActive = true;
    this.isBuscarAvzButtonActive = false;
  }

  toggleBuscarAvzButton(): void {
    this.isBuscarButtonActive = false;
    this.isBuscarAvzButtonActive = true;
  }

}
