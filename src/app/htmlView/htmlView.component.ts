import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-html-view',
  templateUrl: './htmlView.component.html',
  styleUrls: ['./htmlView.component.css']
})
export class HtmlViewComponent implements OnInit {
  htmlEditorOptions = {theme: 'vs-dark', language: 'html', automaticLayout: true};
  cssEditorOptions = {theme: 'vs-dark', language: 'css', automaticLayout: true};
  html = "<h1>Hello World</h1>";
  css = "";
  editor_height = 300;
  split_mode = true;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  checkHeight() {
    if (this.editor_height > 750) return 750;
    else if (this.editor_height < 250) return 250;
    return this.editor_height;
  }

  getCss() {
    let view: SafeHtml = this.sanitizer.bypassSecurityTrustHtml("<style>" + this.css + "</style>");
    return view;
  }
}
