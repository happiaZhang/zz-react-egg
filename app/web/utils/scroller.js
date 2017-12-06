import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from '../components/Anchor';
import validate from './validate';

const scrollHandler = {
  anchorGap: 10,
  targetGap: 20,
  scrElm: {},
  evtFn: {}
};

export const initScrElm = (elm) => {
  const {top, left, width} = elm.getBoundingClientRect();
  scrollHandler.scrElm.self = elm;
  scrollHandler.scrElm.top = top;
  scrollHandler.scrElm.left = left;
  scrollHandler.scrElm.width = width;
};

export const initAnchor = (targetElms, anchorElm, evtFn) => {
  scrollHandler.targets = targetElms;
  scrollHandler.anchor = anchorElm;
  if (evtFn) scrollHandler.evtFn = evtFn;
};

export const fixAnchor = () => {
  const fixInfo = {isFixed: false, ...scrollHandler.scrElm};
  const {top, left} = scrollHandler.anchor.getBoundingClientRect();
  fixInfo.isFixed = top <= scrollHandler.scrElm.top + scrollHandler.anchorGap;
  fixInfo.anchorLeft = left;
  return fixInfo;
};

export const activeTarget = () => {
  const {height} = scrollHandler.scrElm.self.getBoundingClientRect();
  const threshold = height + scrollHandler.scrElm.top - scrollHandler.targetGap;

  let activeTarget = null;
  scrollHandler.targets.forEach(target => {
    const {top} = target.getBoundingClientRect();
    if (top <= threshold) activeTarget = target;
  });

  return activeTarget;
};

export const addScroll = () => {
  if (!validate.isEmpty(scrollHandler.evtFn) && !validate.isEmpty(scrollHandler.scrElm)) {
    Object.keys(scrollHandler.evtFn).forEach(k => {
      scrollHandler.scrElm.self.addEventListener('scroll', scrollHandler.evtFn[k]);
    });
    scrollHandler.noEvt = false;
  }
};

export const removeScroll = () => {
  if (!validate.isEmpty(scrollHandler.evtFn)) {
    Object.keys(scrollHandler.evtFn).forEach(k => {
      scrollHandler.scrElm.self.removeEventListener('scroll', scrollHandler.evtFn[k]);
    });
    scrollHandler.noEvt = true;
  }
};

export const getEvtStatus = () => (scrollHandler.noEvt || true);

export const showHanging = (props) => {
  const {node, ...other} = props;
  ReactDOM.render(<Anchor {...other} show />, node);
};

export const hideHanging = (props) => {
  const {node, ...other} = props;
  ReactDOM.render(<Anchor {...other} show={false} />, node);
};

export const expandingContent = (marginLeft) => {
  scrollHandler.scrElm.self.style.marginLeft = marginLeft + 'px';
};
