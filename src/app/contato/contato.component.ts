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
  colunas = ['foto', 'id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private formBuilder: FormBuilder,
    ) {
      this.nome = 'fred';
    }
    
    ngOnInit(): void {
      this.montarFormulario();
      this.listarContatos();
    }

    montarFormulario(): void {
      this.formulario = this
      .formBuilder
      .group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required] ],
      })
    }

    listarContatos(): void {
      this.service
      .list()
      .subscribe(response => {
        this.contatos = response;
        console.log(this.contatos);
      })
    }

    favoritar(contato: Contato): void {
      this.service
      .favourite(contato)
      .subscribe( response => {
        console.log('Antes de apertar o botao' + contato.favorito);
        contato.favorito = !contato.favorito;
        console.log('Depois de apertar o botao' + contato.favorito);
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
      let lista: Contato[] = [...this.contatos, response];
      this.contatos = lista;
      console.log(this.contatos);
    }, erroResponse => {
      console.log(erroResponse);
    })
  }

  uploadFoto(event, contato) {
    console.log("Evento: " + event);
    console.log("Contato selecionado: " + contato);
    const files = event.target.files;
    console.log("Arquivos: " + files);
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
      .upload(contato, formData)
      .subscribe(response => {
        console.log("Resposta da requisicao: " + response);
        this.listarContatos();
      })
    }
  }


}
