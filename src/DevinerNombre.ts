import { html, css, LitElement, property } from 'lit-element';

export class DevinerNombre extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
    }
    button {
      width: 19%;
    }
  `;

  @property({ type: Number }) max = 0;

  @property({ type: Number }) nombreDeVie = 0;

  private randomNumber: Number = Math.floor(Math.random() * 11);

  private helpLabel: string = '';

  private partyEnd: boolean = false;

  get playerInput() {
    return this.shadowRoot!.getElementById('playerInput')! as HTMLInputElement;
  }

  get playerValue() {
    return parseFloat(this.playerInput.value);
  }

  checkNumber() {
    console.log(this.randomNumber);
    if (!this.partyEnd) {
      this.helpLabel = `Le Chiffre doit être compris entre 0 et 10`;
      if (this.playerValue <= 10 && this.playerValue >= 0) {
        if (this.nombreDeVie >= 1) {
          if (this.playerValue === this.randomNumber) {
            this.helpLabel = `Trouvé ! le nombre à trouver était bien ( ${this.randomNumber} )`;
            this.partyEnd = true;
          } else {
            if (this.playerValue > this.randomNumber) {
              this.helpLabel = ` ${this.playerValue} est trop grand !`;
            }
            if (this.playerValue < this.randomNumber) {
              this.helpLabel = `${this.playerValue} est trop petit !`;
            }
          }
          this.nombreDeVie -= 1;
        }
        if (this.nombreDeVie === 0) {
          this.helpLabel = `Tu n'as plus aucun éssaie le nombre était ${this.randomNumber}`;
          this.partyEnd = true;
        }
      }
    }
  }

  replay() {
    this.helpLabel = '';
    this.partyEnd = false;
    this.nombreDeVie = 3;
    this.randomNumber = Math.floor(Math.random() * 11);
  }

  render() {
    return html`
      <h2>Entrez un nombre entre 0 et 10</h2>
      <h4>Nombre de vie ${this.nombreDeVie}</h4>
      ${this.partyEnd
        ? html``
        : html`<input id="playerInput" />
            <button @click=${this.checkNumber} type="submit">Ok</button>`}
      <h5>${this.helpLabel}</h5>
      ${this.partyEnd
        ? html`<button @click=${this.replay} type="submit">Rejouer</button>`
        : html``}
    `;
  }
}
