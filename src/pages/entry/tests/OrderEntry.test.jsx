import { render, screen, logRoles } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';

//test.only: quando executarmos os testes, apenas esse teste será executado, os demais testes desse arquivo serão desconsiderados ('skipped')
test.only('handles error for scoops and toppings routes', async () => {
  //importamos o server para sobrescrever os handlers padrão de '/src/mocks/server.js'
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      //por padrão, essa rota retorna um array com as options de scoops
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', () => {
      //por padrão, essa rota retorna um array com as options de toppings
      return new HttpResponse(null, { status: 500 });
    })
  );

  const { container } = render(<OrderEntry />);

  const alerts = await screen.findAllByRole('alert', {
    value: 'An unexpected error occurred. Please try again later.',
  });
  logRoles(container);

  expect(alerts).toHaveLength(2);
});

//test.skip: se não quisermos que algum dos testes não seja executado
test.skip('my test 2', () => {});
test('my test 3', () => {});
