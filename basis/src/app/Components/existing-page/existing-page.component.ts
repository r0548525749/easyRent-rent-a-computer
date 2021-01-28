import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-existing-page',
  templateUrl: './existing-page.component.html',
  styleUrls: ['./existing-page.component.css']
})
export class ExistingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }
}


// var input = document.getElementById("myInput");

// // Get the warning text
// var text = document.getElementById("text");

// // When the user presses any key on the keyboard, run the function
// input.addEventListener("keyup", function(event) {

//   // If "caps lock" is pressed, display the warning text
//   if (event.getModifierState("CapsLock")) {
//     text.style.display = "block";
//   } else {
//     text.style.display = "none"
//   }
// });