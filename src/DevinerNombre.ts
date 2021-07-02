import { html, css, LitElement, property } from 'lit-element';

export class DevinerNombre extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
    }

    button {
      width: 35%;
      height: 40px;
      margin-top: 9px;
      background-color: #4caf50;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button:hover {
      cursor: pointer;
      transition: background-color 0.5s ease;
      background-color: #39893c;
    }

    input {
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    input:hover {
      background-color: #45a04;
    }

    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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

  get tentative() {
    return 4 - this.nombreDeVie;
  }

  get playerValue() {
    return parseFloat(this.playerInput.value);
  }

  checkNumber() {
    if (!this.partyEnd) {
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
          this.playerInput.value = '';
        }
        if (this.nombreDeVie === 0 && !this.partyEnd) {
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

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.checkNumber();
    }
  }

  render() {
    return html`
      <h2>Entrez un nombre entre 0 et 10</h2>
      <h4>
        Nombre de vie
        ${this.nombreDeVie
          ? html`<span style="color: #4CAF50; font-size: 25px; margin-left:10px"
              >${this.nombreDeVie}</span
            >`
          : html`<span style="color: darkred; font-size: 25px; margin-left:10px"
              >${this.nombreDeVie}</span
            >`}
      </h4>
      ${this.partyEnd
        ? html``
        : html`<div class="container">
            <input
              placeholder="Tentative n°${this.tentative} "
              id="playerInput"
              @keydown=${this.onKeyDown}
            />
            <button
              @click=${this.checkNumber}
              type="submit"
              style="margin-left: 6%"
            >
              Ok
            </button>
          </div>`}
      <h5>${this.helpLabel}</h5>
      ${this.partyEnd
        ? html`<button @click=${this.replay} type="submit">Rejouer</button>`
        : html``}
    `;
  }
}
