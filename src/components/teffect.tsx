import { useEffect, useState } from 'react';

const TypewriterEffect: React.FC = () => {

  const words = ['ADD', 'EDIT', 'DELETE'];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(300);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const isComplete = !isDeleting && text === currentWord;

      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        setSpeed(100); 
      } else {
        setText((prev) => currentWord.slice(0, prev.length + 1));
        setSpeed(200); 
      }

      if (isComplete) {
        setTimeout(() => setIsDeleting(true), 1000); 
      }

      if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words?.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, speed, wordIndex]);

  return (
    <h1 className="text-4xl font-bold mb-1 whitespace-nowrap text-orange-500 ">
      {text}
      <span className="text-transparent">|</span> 
    </h1>
  );
};

export default TypewriterEffect;
