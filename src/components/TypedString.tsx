import { useRef, useEffect } from 'react';
import Typed from 'typed.js';

interface Props {
  context: string[];
  typeSpeed?: number;
  backSpeed?: number;
}

const TypedString = ({ context, typeSpeed, backSpeed }: Props) => {
  const el = useRef(null);
  const typed = useRef<any>(null);

  useEffect(() => {
    const options = {
      strings: context,
      typeSpeed: typeSpeed || 100,
      backSpeed: backSpeed || 30,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return <span ref={el} />;
};

export default TypedString;
