import React, {useCallback, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import HintLogoDark from '../../../src/assets/hint.svg';
import {hintstyle} from './HintSection.style';

const HintSection = () => {
  const [showHideText, setShowHideText] = useState(false);

  const handlePress = useCallback(() => {
    setShowHideText(!showHideText);
  }, [showHideText]);

  const hintIcon = useMemo(() => {
    return <HintLogoDark width={25} height={25} />;
  }, []);

  return (
    <View style={hintstyle.container}>
      <TouchableOpacity onPress={handlePress} style={hintstyle.icon}>
        {hintIcon}
      </TouchableOpacity>
      {showHideText ? (
        <Text style={hintstyle.text}>
          Please use a valid email and a password at least 6 character!
        </Text>
      ) : null}
    </View>
  );
};

export default HintSection;
