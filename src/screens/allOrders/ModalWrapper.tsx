import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {Children} from 'react';
import Modal from 'react-native-modal';
import CustomIcon from '../../components/customIcon';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: any;
  onPress?: () => void;
};

export default function ModalWrapper({
  visible,
  setVisible,
  children,
  onPress,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      accessible={false}
      animationIn={'fadeInUpBig'}
      animationOut={'fadeOutDownBig'}
      animationInTiming={500}
      animationOutTiming={500}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          borderRadius: 10,
          maxHeight: 600,
        }}>
        <TouchableOpacity onPress={onPress}>
          <CustomIcon
            type="AntDesign"
            icon="close"
            color="red"
            size={30}
            style={{alignSelf: 'flex-end', right: 10, top: -10}}
          />
        </TouchableOpacity>
        <ScrollView>{children}</ScrollView>
      </View>
    </Modal>
  );
}
