import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome: string;
  formulario: FormGroup;
  contatos: Contato[] = [];

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
      nome: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required] ],
    })
  }

  nomeValido(): boolean{
    if (
      this.formulario.controls.nome.errors &&
      this.formulario.controls.nome.errors.required 
      ) {
      return false; 
    }
    return true;
  }

  emailValido(): boolean{
    if (
      this.formulario.controls.email.errors &&
      (this.formulario.controls.email.errors.required ||
      this.formulario.controls.email.errors.email)
    ) {
      return false;
    }
    return true;
  }

  submit(): void{
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service
    .save(contato)
    .subscribe( response => {
      this.contatos.push(response);
      console.log(this.contatos);
    }, erroResponse => {
      console.log(erroResponse);
    })
  }

}
