import type { FC, ReactNode } from 'react';

export interface IShowPublicProps {
  /** A react node to fallback to when showOn is set to false */
  fallback?: ReactNode;
  /** Handles when the component should be showned. */
  showOn: boolean;
}

interface IShowPrivateProps<PropType> extends IShowPublicProps {
  Component: FC<PropType>;
}

/**
 * A HOC component that wraps around showing, hiding, and fallback of components.
 * Please refer to using {@link withShowControl} and not this component directly.
 * @private
 */
function Show<TReactProps = {}>({
  showOn,
  fallback,
  Component,
  ...restProps
}: IShowPrivateProps<TReactProps> & TReactProps) {
  if (showOn) {
    const baseProps = restProps as unknown as TReactProps & {
      children?: ReactNode;
    };
    return <Component {...baseProps} />;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
}

/**
 * A helpful HOC component to wrap around the crazy logical statements.
 *
 * @example
 * ```
 * function() {
 *   return(
 *     <div>
 *       {false && <Cool />}
 *     </div>
 *   )
 * }
 *
 * ```
 * This HOC helps avoid the hectic logical statements in JSX.
 * ```
 * const ShowableCool = withShowControl(Cool)
 * function() {
 *   return(
 *     <div>
 *       <ShowableCool showOn={false} />
 *     </div>
 *   )
 * }
 * ```
 */
export function withShowControl<PropType = {}>(
  component: FC<PropType>
): FC<PropType & IShowPublicProps> {
  return (props: PropType & IShowPublicProps) => {
    return <Show Component={component} {...props} />;
  };
}
