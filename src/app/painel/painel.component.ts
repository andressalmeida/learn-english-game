import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  public frases: Frase[] = FRASES;
  public instrucao: string = "Traduza a frase: "
  public resposta: string = ""
  public rodada: number = 0
  public rodadaFrase: Frase 
  public progressoPainel: number = 0
  public tentativas: number = 3

  //Emitindo evento para o componente app
  @Output() public encerrarJogo = new EventEmitter()

  constructor() {
    this.rodadaFrase = this.frases[this.rodada]
  }

  atualizaResposta(evento: Event): void {
    this.resposta = (<HTMLInputElement>evento.target).value
  }

  verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == this.resposta) {
      
      this.rodada ++
      this.progressoPainel += (100 / this.frases.length)

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }
      this.rodadaFrase = this.frases[this.rodada]
      
    } else {
  
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    } 
    //limpando o text area 
    this.resposta = ''
  }

  ngOnInit(): void {
    
  }

}
