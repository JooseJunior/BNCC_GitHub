//VINICIUS
import { describe, expect, it, jest,} from '@jest/globals';
import LinhaTempoController from "../../controllers/LinhaTempoController.js";
import linhatempos from "../../models/LinhaTempo.js";

describe('Teste de unidade do documento', () => {
    afterEach(() => jest.clearAllMocks());
  
    it('Deve instanciar um novo documento corretamente', () => {
      const Docsexemplo = new Date("2022-08-29");
      const Documento = {
        titulo: 'Projeto de Lei n. 13',
        conteudo: 'O Projeto de Lei 13/22 obriga as empresas de transporte de passageiros (terrestre, aéreo ou fluvial) a fornecer rastreamento dos animais de estimação transportados.',
        criando_em: Docsexemplo
      };
  
      const documento = new linhatempos(Documento);
      expect(documento).toEqual(expect.objectContaining(Documento));
      expect(documento).toHaveProperty('titulo', 'Projeto de Lei n. 13');
    });

    it('Deve retornar um cadastro de documento simulado com Mock', () => {
        const Docsexemplo = new Date("2022-08-29");
        const Documentos = new linhatempos({
          titulo: 'Projeto de Lei n. 13',
          conteudo: 'O Projeto de Lei 13/22 obriga as empresas de transporte de passageiros (terrestre, aéreo ou fluvial) a fornecer rastreamento dos animais de estimação transportados.',
          criando_em: Docsexemplo
        });
      
        LinhaTempoController.AdicionarDocumento = jest.fn().mockReturnValue(Documentos);
      
        const retorno = LinhaTempoController.AdicionarDocumento();
      
        expect(retorno).toEqual(expect.objectContaining({
          criando_em: expect.any(Date),
          ...Documentos,
        }));
      
        expect(LinhaTempoController.AdicionarDocumento).toBeCalledTimes(1);
      });
  });


 