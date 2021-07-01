import { html, css, LitElement, property } from 'lit-element';

export class DevinerNombre extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
    }
  `;

  @property({ type: Number }) max = 0;

  @property({ type: Number }) nombreDeVie = 0;

  private randomNumber: Number = Math.floor(Math.random() * 11);

  private helpLabel: string = '';

  get playerInput() {
    return this.shadowRoot!.getElementById('playerInput')! as HTMLInputElement;
  }

  get playerValue() {
    return parseFloat(this.playerInput.value);
  }

  checkNumber() {
    console.log(this.randomNumber);
    if (this.nombreDeVie === 0) {
      this.helpLabel = `Tu n'as plus aucun éssaie le chiffre était ${this.randomNumber}`;
    }

    if (
      this.playerValue <= 10 &&
      this.playerValue >= 0 &&
      this.nombreDeVie > 0
    ) {
      if (this.playerValue === this.randomNumber) {
        this.helpLabel = `Bien joué tu as trouvé le bon chiffre ( ${this.randomNumber} )`;
      } else {
        if (this.playerValue > this.randomNumber) {
          this.helpLabel = `Le chiffre est plus petit que ${this.playerValue}`;
        }
        if (this.playerValue < this.randomNumber) {
          this.helpLabel = `Le chiffre est plus grand que ${this.playerValue}`;
        }
      }
      this.nombreDeVie -= 1;
    }

    if (this.playerValue > 10 || this.playerValue < 0) {
      this.helpLabel = 'Le chiffre est compris entre 0 et 10';
      console.log(this.playerValue > 10 || this.playerValue < 0);
    }
  }

  render() {
    return html`
      <h1>Entrez un nombre entre 0 et 10</h1>
      <h2>Nombre de vie ${this.nombreDeVie}</h2>
      <input id="playerInput" />
      <button @click=${this.checkNumber} type="submit">ok</button>
      <h5>${this.helpLabel}</h5>
    `;
  }
}
