// test-utils.js
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router');

useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',

}));

const customRender = (ui, options) => render(ui, {...options});

export * from '@testing-library/react';
export { customRender as render };
