import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { withShowControl } from './withShowControl';

describe('withShowControl', () => {
  const Component = () => <div>Content_Visibility</div>;
  const ShowableComponent = withShowControl(Component);
  afterEach(cleanup);

  describe('when `showOn` is true', () => {
    it('should render component', () => {
      render(
        <div>
          Visible Content
          <ShowableComponent showOn={true} />
        </div>
      );

      screen.getByText('Visible Content');
      screen.getByText('Content_Visibility');
    });
  });

  describe('when `showOn` is false', () => {
    it('should not render component', () => {
      render(
        <div>
          Visible Content
          <ShowableComponent showOn={false} />
        </div>
      );

      screen.getByText('Visible Content');
      expect(screen.queryByText('Content_Visibility')).toBeNull();
    });
  });
});
