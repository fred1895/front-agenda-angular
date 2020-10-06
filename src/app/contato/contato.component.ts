import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome: string;

  constructor(
    private service: ContatoService
  ) {
    this.nome = 'fred';
   }

  ngOnInit(): void {
    const c : Contato = new Contato();
    c.nome = this.nome;
    c.email = "fred@gmail.com";
    c.favorito = false;

    this.service
    .save(c)
    .subscribe( response => {
      console.log(response);
    }, erroResponse => {
      console.log(erroResponse);
    })
  }

}
