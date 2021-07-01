import { html, fixture, expect } from '@open-wc/testing';

import { DevinerNombre } from '../src/DevinerNombre.js';
import '../deviner-nombre.js';

describe('DevinerNombre', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<DevinerNombre>(
      html`<deviner-nombre></deviner-nombre>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
