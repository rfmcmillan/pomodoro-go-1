import React from 'react';
import Typewriter from 'typewriter-effect';

const TypedText = () => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .changeDelay(25)
          .typeString('Hello there!')
          .callFunction(() => {
            console.log('String typed out!');
          })
          .pauseFor(1)
          .deleteAll()
          .callFunction(() => {
            console.log('All strings were deleted');
          })
          .typeString('Welcome to Pomodoro Go! ')
          .pauseFor(1000)
          .typeString(
            'This is an app that helps you boost your productivity by providing you with a focus timer, web-site and data dashboard!'
          )
          .start();
      }}
    />
  );
};

export default TypedText;
