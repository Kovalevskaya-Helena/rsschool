import { render, fireEvent } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  test('Render the button', () => {
    const { getByRole } = render(
      <Button onClick={jest.fn()}>My Button</Button>
    );
    getByRole('button');
  });

  test('When gets truthly disabled then render disabled button', () => {
    const { getByRole } = render(
      <Button onClick={jest.fn()} disabled>
        My Button
      </Button>
    );

    expect(getByRole('button')).toBeDisabled();
  });

  test('When the buttons is clicked then onClick is invoked', async () => {
    const onClick = jest.fn();

    const { getByRole } = render(<Button onClick={onClick}>My Button</Button>);

    await fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
