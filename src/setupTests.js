import '@testing-library/jest-dom';
import { server } from './mocks/server';

//Está estabelecendo a API mocking, antes de todos os testes
beforeAll(() => server.listen());

//Reseta qualquer request handlers que você possa adicionar durante os tests,
//Assim, eles não irão afetar outros tests
afterEach(() => server.resetHandlers());

//Encerra o servidor e coloca em ordem depois que os tests forem finalizados
afterAll(() => server.close());
