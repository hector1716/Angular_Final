import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @Input() carro : any[] = [];

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
  }
  onMainProductos(){
    this.router.navigate(['/main/main-productos']);
  }
  onMainCarrito(){
    this.router.navigate(['/main/main-carrito']);
  }
  onlogout(){
    this.httpService.logoutUsuario()
      .then(data => {
        if(data.respuesta == "logout"){
          this.router.navigate(['/login']);
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));

  }

}
