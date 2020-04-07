import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-html-view',
  templateUrl: './htmlView.component.html',
  styleUrls: ['./htmlView.component.css']
})
export class HtmlViewComponent implements OnInit {
  htmlEditorOptions = {theme: 'vs-dark', language: 'html', automaticLayout: true};
  cssEditorOptions = {theme: 'vs-dark', language: 'css', automaticLayout: true};
  jsEditorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true};
  html = "<h1>Hello World</h1>";
  css = "";
  js = "";
  editor_height = 300;
  split_mode = true;
  live_demo = false;

  constructor() {}

  ngOnInit() {
    this.refreshView(true);
  }

  checkHeight() {
    if (this.editor_height > 750) return 750;
    else if (this.editor_height < 250) return 250;
    return this.editor_height;
  }

  refreshView(refresh) {
    if (!refresh) return;
    let head = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>`;
    $('#html-frame').attr('srcdoc', `<html><head>${head}</head><body>${this.html}<style>${this.css}</style><script>${this.js}</script><body></html>`);
  }
}
