import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgOpenCVService, OpenCVLoadResult } from 'ng-open-cv';
import { DomSanitizer } from '@angular/platform-browser';

declare var cv: any;

@Component({
  selector: 'app-image-text',
  templateUrl: './imageToText.component.html',
  styleUrls: ['./imageToText.component.css']
})
export class ImageToTextComponent implements OnInit {
  token: any;
  // Keep tracks of the ready
  openCVLoadResult: Observable<OpenCVLoadResult>;

  // HTML Element references
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('canvasOutput') canvasOutput: ElementRef;

  file = false;
  color_matrix = [];
  text = "+";
  size = 5;

  constructor (
    private ngOpenCVService: NgOpenCVService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.openCVLoadResult = this.ngOpenCVService.isReady$;
  }

  loadImage(event) {
    if (event.target.files.length) {
      const reader = new FileReader();
      const load$ = fromEvent(reader, 'load');
      load$
        .pipe(
          switchMap(() => {
            return this.ngOpenCVService.loadImageToHTMLCanvas(`${reader.result}`, this.canvasOutput.nativeElement);
          })
        )
        .subscribe(
          () => {},
          err => {
            console.log('Error loading image', err);
          }
        );
      reader.readAsDataURL(event.target.files[0]);
      this.file = true;
    } else this.file = false;
  }

  async createText() {
    if (this.file) {
      let canvas = this.canvasOutput.nativeElement;
      let ctx = canvas.getContext('2d');
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let color_matrix = [];
      let matrix = await cv.matFromImageData(imgData);
      let new_size = this.calculateSize(matrix);
      let dsize = new cv.Size(new_size.col, new_size.row);
      // You can try more different parameters
      cv.resize(matrix, matrix, dsize, 0, 0, cv.INTER_AREA);
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.cols; j++) {
          let pixel = matrix.ucharPtr(i, j);
          if (!color_matrix[i]) color_matrix[i] = [];
          color_matrix[i][j] = [`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`];
        }
      }
      this.color_matrix = color_matrix;
      this.resize();
    }
  }

  resize() {
    document.getElementById('result').style.fontSize = this.size + "px";
    document.getElementById('result').style.lineHeight = this.size + "px";
  }

  export() {
    if (this.color_matrix && this.color_matrix.length > 0) {
      let html = document.getElementById('result').outerHTML;
      let data = new Blob([html]);
      let download_btn = document.createElement('a');
      download_btn.href = URL.createObjectURL(data);
      download_btn.download = 'Download.html';
      download_btn.click();
    }
  }

  calculateSize(matrix) {
    const MAX = 400;
    if (matrix.rows > MAX || matrix.cols > MAX) {
      let ratio = matrix.rows / matrix.cols;
      let row = MAX;
      let col = MAX;
      if (matrix.rows > matrix.cols) col = Math.round(MAX / ratio);
      else row = Math.round(MAX * ratio);
      return {row: row, col: col};
    } else return {row: matrix.rows, col: matrix.cols};
  }
}
