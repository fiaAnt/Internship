import { render, screen } from '@testing-library/react';
import ToDoItem from '../components/ToDoItem';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test('renders note text', () => {
  render(
    <Provider store={store}>
      <ToDoItem note={{ id: '1', text: 'Hello', status: false }} />
    </Provider>
  );

  expect(screen.getByText('Hello')).toBeInTheDocument();
});
