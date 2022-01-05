import {render, screen} from '@testing-library/react';
import App from '..';

describe('App', () => {
  it('render correctly', () => {
    render(<App />);

    screen.getByRole('heading', {name: 'Hello world'});
  });
});
