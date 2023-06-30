import 'zone.js/dist/zone';
import { Component, DoCheck, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgForm, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'my-app',
  standalone: true,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  imports: [CommonModule, MatFormFieldModule, FormsModule],
})
export class App implements DoCheck {
  // name: string = '4200';

  @ViewChild('whitelabelForm', { static: true }) private whitelabelForm: NgForm;
  redColor: any = 121;
  greenColor: any = 164;
  blueColor: any = 221;
  loginLogoHeight: any = 150;
  navbarLogoWidth: any = 260;
  public imagePath: string;
  imgURL: any;
  public message: string;

  showWideumLogo = true;
  mostrarGenerar = false;
  valido = true;
  template: any = {
    name: 'Nombre',
    styles: [
      {
        var: '--primary-color',
        value: 'rgb(102, 162, 167)',
      },
      {
        var: '--primary-color-05',
        value: 'rgba(102, 162, 167, 0.5)',
      },
      {
        var: '--primary-color-01',
        value: 'rgba(102, 162, 167, 0.1)',
      },
      {
        var: '--primary-color-dark',
        value: 'rgb(123, 198, 184)',
      },
      {
        var: '--login-logo-height',
        value: '150px',
      },
      {
        var: '--navbar-logo-width',
        value: '260px',
      },
      {
        var: '--login-logo',
        value: "url('/assets/whitelabels/maqcenter/login-logo.svg')",
      },
      {
        var: '--navbar-logo',
        value: "url('/assets/whitelabels/maqcenter/navbar-logo.svg",
      },

      {
        var: '--login-wideum-logo-display',
        value: 'none',
      },
    ],
  };
  navbarLogo: any = this.template.styles[7].value;
  loginLogo: any = this.template.styles[6].value;

  ngDoCheck(): void {
    if (this.whitelabelForm.status === 'INVALID') {
      console.log('pasan cosas');
      this.valido = false;
      //No permitir que el botón se pulse
    } else {
      this.valido = true;
      this.calculateWhitelabel();
    }
  }
  ngOnInit(): void {}

  calculateWhitelabel(): void {
    this.setColors();

    this.template.styles.forEach((data: any) => {
      document.documentElement.style.setProperty(data.var, data.value);
    });
    // this.showColor();
    // this.printWL();
  }

  setColors() {
    // --primary-color
    this.template.styles[0].value =
      'rgb(' +
      this.redColor +
      ',' +
      this.greenColor +
      ',' +
      this.blueColor +
      ')';
    // --primary-color 05
    this.template.styles[1].value =
      'rgba(' +
      this.redColor +
      ',' +
      this.greenColor +
      ',' +
      this.blueColor +
      ', 0.5)';
    // --primary-color 01
    this.template.styles[2].value =
      'rgba(' +
      this.redColor +
      ',' +
      this.greenColor +
      ',' +
      this.blueColor +
      ', 0.1)';

    // --primary-color dark
    let redcolorDark = this.redColor - 80 > 0 ? this.redColor - 80 : 0;
    let greencolorDark = this.greenColor - 80 > 0 ? this.greenColor - 80 : 0;
    let bluecolorDark = this.blueColor - 80 > 0 ? this.blueColor - 80 : 0;
    this.template.styles[3].value =
      'rgba(' + redcolorDark + ',' + greencolorDark + ',' + bluecolorDark + ')';

    // --login-logo-height
    this.template.styles[4].value = this.loginLogoHeight + 'px';

    //--navbar-logo-width
    this.template.styles[5].value = this.navbarLogoWidth + 'px';

    // var: '--login-logo',
    this.template.styles[6].value =
      "url('/assets/whitelabels/" + this.template.name + "/login-logo.svg')";
    
    // '"url(\'' + this.loginLogo + '\')"';

    // var: '--navbar-logo',
    this.template.styles[7].value =
      "url('/assets/whitelabels/" + this.template.name + "/navbar-logo.svg')";
    // '"url(\'' + this.navbarLogo + '\')"';

    //--login-wideum-logo-display
    if (this.showWideumLogo == false) {
      this.template.styles[8].value = 'none';
    } else {
      this.template.styles[8].value = 'block';
    }
  }

  printWL() {
    console.log('template', this.template);
    console.log(JSON.stringify(this.template));
  }

  generarJson() {
    if (!this.valido) {
      alert(
        'Revisa el formulario, le falta algún dato o tiene algún campo incorrecto'
      );
      return;
    }
    this.printWL();
    alert(JSON.stringify(this.template));
  }

  showColor() {
    let colorResult = document.getElementById('colorResult');
    console.log(colorResult);
    if (colorResult) {
      colorResult.style.backgroundColor =
        'rgb(' +
        this.redColor +
        ',' +
        this.greenColor +
        ',' +
        this.blueColor +
        ')';
      console.log(
        'rgb(' +
          this.redColor +
          ',' +
          this.greenColor +
          ',' +
          this.blueColor +
          ')'
      );
    }
  }

  preview(files: any) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  toggleWideumLogo(): void {
    this.showWideumLogo = !this.showWideumLogo;
    console.log('this.showWideumLogo', this.showWideumLogo);
  }
}

bootstrapApplication(App);
