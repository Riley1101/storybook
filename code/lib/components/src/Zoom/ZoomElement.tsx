import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { styled } from '@storybook/theming';
import { browserSupportsCssZoom } from './browserSupportsCssZoom';

const ZoomElementWrapper = styled.div<{ scale: number; height: number }>(({ scale = 1, height }) =>
  browserSupportsCssZoom()
    ? {
        '> *': {
          zoom: 1 / scale,
        },
      }
    : {
        height: height ? height + 50 : 'auto',
        transformOrigin: 'top left',
        transform: `scale(${1 / scale})`,
      }
);
type ZoomProps = {
  scale: number;
  children: ReactElement | ReactElement[];
};

export function ZoomElement({ scale, children }: ZoomProps) {
  const componentWrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (componentWrapperRef.current) {
      setHeight(componentWrapperRef.current.getBoundingClientRect().height);
    }
  }, [scale, componentWrapperRef.current]);

  return (
    <ZoomElementWrapper scale={scale} height={height}>
      <div ref={componentWrapperRef} className="innerZoomElementWrapper">
        {children}
      </div>
    </ZoomElementWrapper>
  );
}
