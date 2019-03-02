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
  view: SafeHtml;
  root_styles: String = "";
  live_demo = false;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
    for (let i = 0; i < styles.length; i++) {
      this.root_styles += styles[i].outerHTML;
    }
    this.refreshView(true);
  }

  checkHeight() {
    if (this.editor_height > 750) return 750;
    else if (this.editor_height < 250) return 250;
    return this.editor_height;
  }

  refreshView(refresh) {
    if (!refresh) return;
    this.view = this.sanitizer.bypassSecurityTrustHtml(`<html><head>${this.root_styles}</head><body>${this.html}<style>${this.css}</style><body></html>`);
  }
}
