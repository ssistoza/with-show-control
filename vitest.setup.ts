import * as matchers from 'vitest-dom/matchers';
import { expect } from 'vitest';

import '@testing-library/jest-dom/vitest';

expect.extend(matchers);
