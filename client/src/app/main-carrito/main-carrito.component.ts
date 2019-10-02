import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-carrito',
  templateUrl: './main-carrito.component.html',
  styleUrls: ['./main-carrito.component.css']
})
export class MainCarritoComponent implements OnInit {
  carrito : any[] = [];
  total = 0;
  error:string;

  constructor(private router: Router, private httpService : HttpService) { }

  ngOnInit() {
    //obtengo los articulos en el carrito y genero un total de compra
    this.httpService.actualizarCarrito()
      .then(data => {
        if(data.respuesta == "OK"){
          this.carrito = data.carrito;

          //con el carrito obtenido genero un total de la compra
          for (var i = 0; i < this.carrito.length; i++) {
            this.total += this.carrito[i].precio * this.carrito[i].cantidad;
        	}
        }else {
          alert(data.respuesta);
        }
      })
      .catch(error => console.log(error));
  }

  //catalogo de productos
  regresar(){
    this.router.navigate(['/main']);
  }

  //pago de los articulos 
  pagar(){
    for (var i = 0; i < this.carrito.length; i++) {
      let producto = this.carrito[i];

      //actualizar
      this.httpService.actualizaArticulosBD({_id: producto.producto_id, unidades: producto.unidades, cantidad: producto.cantidad})
        .then(data => {
          if(data.respuesta == "OK"){
            //eliminar el articulo del carrito.
            this.httpService.eliminaCarritoBD({_id: producto._id})
            .then(data => {
              if(data.respuesta == "OK"){
                this.salirCatalogo();
              }else {
                alert(data.respuesta);
              }
            })
            .catch(error => console.log(error));
          }else {           
            alert(data.respuesta);
          }
        })
        .catch(error => console.log(error));
    }
  }
  salirCatalogo(){
    this.httpService.actualizarCarrito()
      .then(data => {
        if(data.carrito.length == 0){
          this.router.navigate(['/main']);
        }
      })
      .catch(error => console.log(error));
  }

}
