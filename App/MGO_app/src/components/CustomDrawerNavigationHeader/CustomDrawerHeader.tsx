import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './CustomDrawerHeaderStyle';
interface CustomDrawerHeaderProps {
  title: string;
  onMenuPress: () => void;
}

const CustomDrawerHeader: React.FC<CustomDrawerHeaderProps> = ({
  title,
  onMenuPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Add more elements to the header if needed */}
    </View>
  );
};

export default CustomDrawerHeader;
