import { BibliotecaFrontEndPage } from './app.po';

describe('biblioteca-front-end App', () => {
  let page: BibliotecaFrontEndPage;

  beforeEach(() => {
    page = new BibliotecaFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
