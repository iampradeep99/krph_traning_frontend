import React, { useState, useRef } from "react";
import styled from "styled-components";
import Portal from "./Portal";

const StyledTooltip = styled.span.attrs((p) => ({
  bg: p.bg || "dark",
  delay: p.delay || 0.01,
}))`
  position: fixed;
  top: ${(p) => p.posRef.current.y}px;
  left: ${(p) => p.posRef.current.x}px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  background: #2d3e48;
  color: #e0e5e8;
  pointer-events: none;
  padding: 6px 12px;
  border-radius: 4px;
  z-index: 99999;
  display: inline-block;
  white-space: nowrap;
  opacity: ${(p) => p.show};
  transition-property: transform, opacity !important;
  transition-duration: 0.06s !important;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) !important;
  transition-delay: ${(p) => (p.show ? p.delay : 0.02)}s !important;
  transform-origin: ${(p) => position(p.placment).negate()};
  transform: scale(${(p) => (p.show ? 1 : 0.7)});
  box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 15%);
`;

const position = (p) => ({
  current: p,
  negate() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const point = () => ({
  x: null,
  y: null,
  reset(p) {
    this.x = p.x;
    this.y = p.y;
  },
  restrictRect(rect) {
    if (this.x < rect.l) this.x = rect.l;
    else if (this.x > rect.r) this.x = rect.r;
    if (this.y < rect.t) this.y = rect.t;
    else if (this.y > rect.b) this.y = rect.b;
  },
});

const getPoint = (el, tt, placement, space) => {
  let recurCount = 0;
  const pt = point();
  const bdys = {
    l: space,
    t: space,
    r: document.body.clientWidth - (tt.clientWidth + space),
    b: window.innerHeight - (tt.clientHeight + space),
  };
  const elRect = el.getBoundingClientRect();

  return (function recursive(placement) {
    recurCount++;
    const pos = position(placement);
    switch (pos.current) {
      case "left":
        pt.x = elRect.left - (tt.offsetWidth + space);
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "right":
        pt.x = elRect.right + space;
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "top":
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.top - (tt.offsetHeight + space);
        break;
      default:
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.bottom + space;
    }

    if (recurCount < 3)
      if (
        (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
        (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
      ) {
        pt.reset(recursive(pos.negate()));
      }
    pt.restrictRect(bdys);
    return pt;
  })(placement);
};

function Tooltip({
  text,
  placement = "bottom",
  space = 10,
  children,
  delay,
  bg,
}) {
  const [show, setShow] = useState(0);
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();

  const handleMOver = (e) => {
    setShow(1);
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      space,
    );
  };
  const handleMOut = () => setShow(0);

  return (
    <React.Fragment>
      {children
        ? React.cloneElement(children, {
            onMouseOver: handleMOver,
            onMouseOut: handleMOut,
          })
        : null}
      <Portal>
        <StyledTooltip
          delay={delay}
          bg={bg}
          ref={tooltipRef}
          posRef={posRef}
          show={show}
        >
          {text}
        </StyledTooltip>
      </Portal>
    </React.Fragment>
  );
}

export default Tooltip;
