import type { CSSProperties } from 'react';

export interface IReactReaderStyle {
  container: CSSProperties;
  readerArea: CSSProperties;
  containerExpanded: CSSProperties;
  titleArea: CSSProperties;
  reader: CSSProperties;
  swipeWrapper: CSSProperties;
  prev: CSSProperties;
  next: CSSProperties;
  arrow: CSSProperties;
  arrowHover: CSSProperties;
  tocBackground: CSSProperties;
  toc: CSSProperties;
  tocArea: CSSProperties;
  tocAreaButton: CSSProperties;
  tocButton: CSSProperties;
  tocButtonExpanded: CSSProperties;
  tocButtonBar: CSSProperties;
  tocButtonBarTop: CSSProperties;
  loadingView: CSSProperties;
  tocButtonBottom: CSSProperties;
  tocAreaExpanded: CSSProperties;
  tocButtonIconExpanded:CSSProperties;
  tocButtonIcon:CSSProperties;
}

export const ReactReaderStyle: IReactReaderStyle = {
  container: {
    position: 'relative',
    height: '100%',
  },
  readerArea: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    transition: 'all .3s ease',
  },
  containerExpanded: {
    // transform: 'translateX(256px)',
    // border: '1px solid red',
    zIndex: 0,
  
  },
  titleArea: {
    position: 'absolute',
    top: 20,
    left: 50,
    right: 50,
    textAlign: 'center',
    color: '#999',
  },
  reader: {
    position: 'absolute',
    top: 50,
    left: 50,
    bottom: 20,
    right: 50,
  },
  swipeWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 200,
    backgroundColor: 'red',
  },
  prev: {
    left: 340,
  },
  next: {
    right: 320,
  },
  arrow: {
    position:'absolute',
    fontSize: '16px',
		fontWeight: '600',
		lineHeight: '22.4px',
    fontFamily: 'raleway, sans-serif',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '119px',
    height: '40px',
    borderRadius: '50px',
    boxShadow: '1px 1px 4px 0px #00000040',
    bottom: '-48px',
  },
  arrowHover: {
     color: '#f4f4f4',
  },
  toc: {},
  tocBackground: {
    position: 'absolute',
    left: 256,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  
  },
  tocArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    width: 256,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: '#f2f2f2',
    padding: '10px',
    borderRadius: 15,
    // height: '100%',
    // background: 'red',
  },

  tocAreaExpanded: {
    boxShadow: '1px 1px 4px 0px #00000040',
  },

  tocAreaButton: {
    userSelect: 'none',
    appearance: 'none',
    background: 'none',
    border: 'none',
    display: 'block',
    fontFamily: 'sans-serif',
    width: '100%',
    fontSize: '.9em',
    textAlign: 'left',
    padding: '.9em 1em',
    borderBottom: '1px solid #ddd',
    color: '#aaa',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: 'pointer',
  },
  tocButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    background: '#FF3333',
    color: 'white',
    borderRadius: '8px',
    padding: '13px 41px',
    border: 'none',
    position: 'absolute',
    top: -80,
    // left: 10,
    outline: 'none',
    cursor: 'pointer',
  },
  tocButtonIcon: {},
  tocButtonIconExpanded: {
    transform: 'rotate(180deg)',
  },

  tocButtonExpanded: {
    // background: '#f2f2f2',
    // left: -256,
  },
  tocButtonBar: {
    position: 'absolute',
    width: '60%',
    // background: '#ccc',
    height: 2,
    left: '50%',
    margin: '-1px -30%',
    top: '50%',
    transition: 'all .5s ease',
    background: 'red',
  },
  tocButtonBarTop: {
    top: '35%',
  },
  tocButtonBottom: {
    top: '66%',
  },
  loadingView: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    color: '#ccc',
    textAlign: 'center',
    marginTop: '-.5em',
  },
};
