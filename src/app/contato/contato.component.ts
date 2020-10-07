import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome: string;
  formulario: FormGroup;
  constructor(
    private service: ContatoService,
    private formBuilder: FormBuilder,
  ) {
    this.nome = 'fred';
   }

  ngOnInit(): void {
    this.formulario = this
    .formBuilder
    .group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
    })
    /*
    this.service
    .save(c)
    .subscribe( response => {
      console.log(response);
    }, erroResponse => {
      console.log(erroResponse);
    })
    */
  }

  submit(): void{
     console.log(this.formulario.value);
  }

}
