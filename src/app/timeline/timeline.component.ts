import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  htmlEditorOptions = {theme: 'vs-dark', language: 'html', automaticLayout: true};
  jsonEditorOptions = {theme: 'vs-dark', language: 'json', automaticLayout: true};
  json =
  `{
    "items": [
      {
        "time": "2020-01-01",
        "content": "Test",
        "title": "Very long title"
      }
    ]
}`;
  html = "";

  constructor() {}

  ngOnInit() {
    this.createHtml();
  }

  createHtml() {
    let parsed;
    try {
      parsed = JSON.parse(this.json);
      for (let i = 0; i < parsed.items.length; i++) {
        if (!new Date(parsed.items[i].time).getTime()) {
          this.html = "Thời gian không hợp lệ";
          return;
        }
        parsed.items[i].timestamp = new Date(parsed.items[i].time).getTime();
      }
      parsed.items.sort((a, b) => a.timestamp - b.timestamp);
      let total = parsed.items[parsed.items.length -1] - parsed.items[0];
      this.html = "<div style='width: 100%'>";
      for (let i = 0; i < parsed.items.length; i++) {
        this.html += `<div style="height: 10px; color: ${this.getRandomColor()};width: ${parsed.items[i].timestamp}"`;
      }
      this.html += "</div>";
    } catch (err) {
      this.html = "JSON không hợp lệ";
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
