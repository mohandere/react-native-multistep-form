
    const prevStepRef = React.useRef(0);
    const scrollOffsetRef = React.useRef(0);
    const directionRef = React.useRef('right');

    

    const onSetSwipeEnabled = val => setSwipeEnabled(val);

    const goToPrevStep = () => {
      setActiveStep(activeStep - 1);
      swiperRef.current.scrollBy(-1);
    };


    const onSlideChange = (newStepIndex, prevStepIndex) => {
      onSetActiveStep(newStepIndex);
    };



    // If prev step is valid then allow to go back
    const canGoToPrevStep = (prevStepIndex) => {
      if (prevStepIndex < 0) {
        return false;
      }
     const prevStepId = getStepIdByIndex(prevStepIndex);
     const canGo = state[prevStepId].isValid;
     console.log('🚀 canGoToPrevStep  -->', canGo);
     return canGo;
   };

   // If active step is invalid then dont allow to go next
   const canGoToNextStep = (activeStepIndex) => {
     if (activeStepIndex > STEP_COUNT) {
       return false;
     }
     const activeStepId = getStepIdByIndex(activeStepIndex);
     const canGo = state[activeStepId].isValid;
     console.log('🚀 canGoToNextStep -->', canGo);
     return canGo;
   };

   const isActiveStepValid = () => {
     const activeStepId = getStepIdByIndex(activeStep);
     return state[activeStepId].isValid;
   };




   const getStepIdByIndex = index => Object.keys(state)[index];

   const onScroll = event => {
     const activeOffset = event.nativeEvent.contentOffset.x;
     const direction = activeOffset > scrollOffsetRef.current ? 'right' : 'left';
     console.log('🚀 ~  direction ---> ', direction);
     scrollOffsetRef.current = activeOffset;
     directionRef.current = direction;
   };
   // const debouncedOnScroll = debounce(onScroll, 50);
   // const Step = steps[activeStep].component;



   React.useLayoutEffect(() => {
    console.log('prevStepRef.current-->', prevStepRef.current)
    console.log('activeStep-->', activeStep);
   if (prevStepRef.current !== activeStep) {
     swiperRef.current.scrollTo(activeStep);
   }
  }, [activeStep]);



  let validStepsCount = 0;
  Object.keys(state).forEach(key => {
    if (state[key].isValid) {
      validStepsCount += 1;
    }
  });
