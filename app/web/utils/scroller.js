import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from '../components/Anchor';
import validate from './validate';

let nodeContainer = null;
const scrollHandler = {
  anchorGap: 10,
  targetGap: 20,
  scrElm: {},
  evtFn: {}
};

export const initScrElm = (elm) => {
  const {top} = elm.getBoundingClientRect();
  scrollHandler.scrElm.self = elm;
  scrollHandler.scrElm.top = top;
};

export const initAnchor = (targetElms, anchorElm, evtFn) => {
  scrollHandler.targets = targetElms;
  scrollHandler.anchor = anchorElm;
  if (evtFn) scrollHandler.evtFn = evtFn;
};

export const fixAnchor = () => {
  const fixInfo = {isFixed: false};
  const {left: scrLeft} = scrollHandler.scrElm.self.getBoundingClientRect();
  const {top, left} = scrollHandler.anchor.getBoundingClientRect();
  fixInfo.isFixed = top <= scrollHandler.scrElm.top + scrollHandler.anchorGap;
  fixInfo.anchorStyle = {
    paddingTop: 20,
    marginLeft: left - scrLeft
  };
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

const isValid = () => (scrollHandler.scrElm.self && !validate.isEmpty(scrollHandler.evtFn));

export const addScroll = () => {
  if (isValid()) {
    Object.keys(scrollHandler.evtFn).forEach(k => {
      scrollHandler.scrElm.self.addEventListener('scroll', scrollHandler.evtFn[k]);
    });
  }
};

export const removeScroll = () => {
  if (isValid()) {
    Object.keys(scrollHandler.evtFn).forEach(k => {
      scrollHandler.scrElm.self.removeEventListener('scroll', scrollHandler.evtFn[k]);
    });
  }
};

export const showHanging = (props) => {
  if (!nodeContainer) {
    nodeContainer = document.createElement('div');
    nodeContainer.style.position = 'fixed';
    nodeContainer.style.top = scrollHandler.scrElm.top + 'px';
    nodeContainer.style.left = scrollHandler.scrElm.marginLeft + 'px';
    nodeContainer.style.width = '100%';
    nodeContainer.style.backgroundColor = '#f5f7fa';
    nodeContainer.style.zIndex = 1000;
    nodeContainer.style.transition = 'left 250ms';
    document.body.appendChild(nodeContainer);
  }
  ReactDOM.render(<Anchor {...props} show />, nodeContainer);
};

export const hideHanging = (props) => {
  if (nodeContainer) {
    ReactDOM.render(<Anchor {...props} show={false} />, nodeContainer);
  }
};

export const flexingContent = (marginLeft) => {
  scrollHandler.scrElm.marginLeft = marginLeft;

  if (scrollHandler.scrElm.self) {
    scrollHandler.scrElm.self.style.marginLeft = marginLeft + 'px';
  }

  if (nodeContainer) {
    nodeContainer.style.left = marginLeft + 'px';
  }
};
