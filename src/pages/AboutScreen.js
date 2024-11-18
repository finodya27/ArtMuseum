import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/AboutScreenStyles';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D5603AQH5pq3cehJFIw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1696144969558?e=1737590400&v=beta&t=kcWVl8CykRaL77IAKKSWro8_Jv1SDv8rlrghAFfdAPU' }}
          style={styles.logo}
        />
        <Text style={styles.name}>Finodya Yahdun</Text>
        <Text style={styles.nim}>21120122130065</Text>
        <Text style={styles.aboutText}>
          ArtMuseum adalah aplikasi yang menampilkan informasi terkait pameran seni, termasuk karya-karya seni yang sedang dipamerkan, 
          departemen-departemen yang bekerja sama, serta seniman yang terlibat dalam pameran. Aplikasi ini dirancang untuk memberikan 
          pengalaman yang mudah diakses bagi pengguna yang tertarik untuk mengetahui lebih banyak tentang seni, kolaborasi antar 
          departemen, dan kontribusi para seniman dalam pameran.
        </Text>
      </View>
    </View>
  );
};

export default AboutScreen;
