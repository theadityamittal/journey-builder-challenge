import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

// add global wrappers here (React Query, Redux, etc.)
const customRender = (ui: ReactElement) => render(ui);

export * from '@testing-library/react';
export { customRender as render };
