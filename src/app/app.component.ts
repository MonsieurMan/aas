import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('buttonColor', [
      state('true', style({
        transform: 'scale(1)'
      })),
      state('false', style({
        transform: 'scale(2)'
      })),
      transition('false => true', animate('150ms ease-in')),
      transition('true => false', animate('150ms ease-out'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private context: CanvasRenderingContext2D;
  private lastPoint = {
    x: this.randomWidth(),
    y: this.randomHeight()
  }
  title = 'app';
  buttonState = 'true';

  randomHeight(): number {
    return window.innerHeight - Math.random() * window.innerHeight;
  }

  randomWidth(): number {
    return window.innerWidth - Math.random() * window.innerWidth;
  }

  ngAfterViewInit() {
    const htmlCanvas = <HTMLCanvasElement>this.canvas.nativeElement;
    htmlCanvas.height = window.innerHeight;
    htmlCanvas.width = window.innerWidth;
    this.context = htmlCanvas.getContext('2d');
    setInterval(() => {
      this.buttonState = this.buttonState === 'true'
        ? 'false'
        : 'true';
      this.drawNewLine();
    }, 150);
  }

  private drawNewLine(): void {
    console.log(this.lastPoint);
    const newPoint = {
      x: this.randomWidth(),
      y: this.randomHeight()
    }

    // tslint:disable-next-line:no-bitwise
    this.context.strokeStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);



    this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.context.lineTo(newPoint.x, newPoint.y);
    this.context.stroke();
    this.lastPoint = newPoint;
  }

  getAntoine(): void {
    alert('Antoine is downloading into your computer, please wait.');
  }
}
