import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

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
