'use client';
import { useEffect } from "react";

// ````````````````REDUX IMPORTS````````````````
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const FONT_ROBOTO = '"Roboto", sans-serif';

const FONTS = [
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@0,100..900&display=swap',
  },
  {
    cssSrc: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap',
  },
];

const TNC_CONFIG = {
  buttonText: 'Pay',
  styles: {
    fontFamily: FONT_ROBOTO,
    fontSize: '12px',
    color: 'gray',
  },
  frameStyle: {
    visibility: 'hidden',
  },
  link: {
    'color': 'blue',
    ':hover': {
      cursor: 'pointer',
      color: 'red',
    },
  },
  fonts: FONTS,
}

const TNC = () => {
  const isSdkReady = useSelector((state: RootState) => state.sdk.isSdkReady);

useEffect(() => {
  if(!isSdkReady) return;

    const instance = window?.TBDropin?.create('tb_tnc', TNC_CONFIG);
    instance?.mount('#tnc');

    return () => instance?.unmount();
}, [isSdkReady]);

  return (
    <div id="tnc"></div>
  )
}

export default TNC