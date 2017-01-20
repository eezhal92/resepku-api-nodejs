import htmlPdf from 'html-pdf';
import pug from 'pug';
import { publicFilesPath } from '../utils';

export class PdfService {
  constructor(options) {
    this.options = options;
  }

  async generate(template, fileName) {
    try {
      let filePath = `${this.options.absoluteFolderPath}/${fileName}`;

      const compiledPdf = await this.options.htmlPdf.create(template, this.options.htmlPdfOptions);

      const getResult = () => new Promise((resolve, reject) => {
        compiledPdf.toFile(filePath, (err) => {
          if (err) reject(err);

          resolve(filePath);
        });
      });

      return await getResult();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async generateForRecipe(recipe) {
    const compiledFunction = await this.options.pug.compileFile('src/templates/pdf/recipe.pug');

    const templateParams = {
      recipe,
    };

    const html = await compiledFunction(templateParams);

    return await this.generate(html, `recipe-${recipe.id}.pdf`);
  }
}

export default new PdfService({
  htmlPdf,
  htmlPdfOptions: {
    phantomPath: './node_modules/phantomjs-prebuilt/bin/phantomjs',
    format: 'Letter',
  },
  pug,
  absoluteFolderPath: publicFilesPath,
});
