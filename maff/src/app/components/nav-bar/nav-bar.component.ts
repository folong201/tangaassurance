import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menu: any
  navbar: any
  isViewAble: boolean = true
  element: any
  islogedIn: boolean = false
  role = ''
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')?.toString() || ''
    console.log("Le role est");

    console.log(this.role);

    if (localStorage.getItem("token")) {
      this.islogedIn = true
    }
    //verirfier s'il y'a un toker et modifier les boutons de connexion et d'enregistraments
    this.element = this.elementRef.nativeElement.querySelector('.navbar');
  }

  toggle() {
    this.renderer.addClass(this.element, 'open');
    this.isViewAble = !this.isViewAble
  }
}
