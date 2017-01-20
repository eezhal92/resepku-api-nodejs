import { PdfService } from '../PdfService';
import { publicFilesPath } from '../../utils';

describe('PdfService', () => {

  describe('generate', () => {

    it('generate pdf file from html', async (done) => {
      const toFileSpy = jest.fn((filename, cb) => {
        cb()
      });
      const createSpy = jest.fn(() => ({
        toFile: toFileSpy,
      }));

      const fakeHtmlPdf = {
        create: createSpy,
      };

      const htmlPdfOptions = {
        phantomPath: './node_modules/phantomjs-prebuilt/bin/phantomjs',
        format: 'Letter',
      };

      const pdfService = new PdfService({
        htmlPdf: fakeHtmlPdf,
        absoluteFolderPath: publicFilesPath,
        htmlPdfOptions,
      });

      const html = `
        <div>Hello</div>
      `;

      const filePath = await pdfService.generate(html, 'foo.pdf');

      expect(filePath).toBe(`${publicFilesPath}/foo.pdf`);
      expect(toFileSpy).toBeCalled();
      expect(createSpy).toBeCalledWith(html, htmlPdfOptions);

      done();
    });

    it('throw error when fail to create pdf file', () => {
      const toFileSpy = jest.fn((filename, cb) => {
        cb(new Error('Create PDF file failed'));
      });
      const createSpy = jest.fn(() => ({
        toFile: toFileSpy,
      }));

      const fakeHtmlPdf = {
        create: createSpy,
      };

      const htmlPdfOptions = {
        phantomPath: './node_modules/phantomjs-prebuilt/bin/phantomjs',
        format: 'Letter',
      };

      const pdfService = new PdfService({
        htmlPdf: fakeHtmlPdf,
        absoluteFolderPath: publicFilesPath,
        htmlPdfOptions,
      });

      const html = `
        <div>Hello</div>
      `;

      return pdfService.generate(html, 'foo.pdf').catch(err => {
        expect(err.message).toBe('Create PDF file failed');
      });
    });

  });

});
