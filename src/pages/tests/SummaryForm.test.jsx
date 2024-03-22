//Condições iniciais:
// O checkbox não está selecionado por padrão
// Selecionar o checkbox habilita o botão

import { render, screen } from '@testing-library/react';
import SummaryForm from '../summary/SummaryForm';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);
  //encontra elementos:
  const checkboxElement = screen.getByRole('checkbox', { name: /conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm/i });

  //verifica as condições iniciais
  expect(buttonElement).toBeDisabled(); //button submit desabilitado
  expect(checkboxElement).not.toBeChecked(); //checkbox não selecionado
});

test('Checkbox disables button on first click and enables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  //encontra elementos:
  const checkboxElement = screen.getByRole('checkbox', { name: /conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm/i });

  //primeiro click do checkbox.
  await user.click(checkboxElement);

  //verifica condições depois de selecionar o checkbox
  expect(buttonElement).toBeEnabled(); //button submit habilitado

  //segundo click do checkbox.
  await user.click(checkboxElement);

  //verifica condições depois de selecionar o checkbox
  expect(buttonElement).toBeDisabled(); //button submit desabilitado
});
