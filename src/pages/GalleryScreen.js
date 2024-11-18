import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { getDepartments } from '../services/artworkService';
import styles from '../styles/GalleryScreenStyles';

const generateDescription = (title) => {
  const descriptions = {
    'Painting': 'Menampilkan karya-karya luar biasa dari berbagai periode, koleksi ini memperlihatkan lukisan-lukisan yang menunjukkan perkembangan teknik dan ekspresi seni dari waktu ke waktu.',
    'Drawing': 'Dari sketsa awal hingga karya jadi, koleksi ini menyoroti seni menggambar yang merupakan dasar penting dalam pengembangan seni visual.',
    'Sculpture': 'Menghadirkan karya seni tiga dimensi yang menunjukkan penguasaan bentuk, material, dan ruang melalui tradisi pahat yang beragam.',
    'Photography': 'Menangkap momen dan perspektif, koleksi ini mempersembahkan karya fotografi baik dari masa lalu maupun kontemporer yang mendokumentasikan dan menginterpretasi dunia kita.',
    'Prints': 'Mengeksplorasi teknik-teknik seni cetak, dari ukiran kayu hingga litograf, koleksi ini menunjukkan keahlian dalam membuat beberapa salinan karya seni.',
    'Architecture': 'Mendokumentasikan lingkungan yang dibangun melalui gambar, model, dan foto, koleksi ini mengeksplorasi pertemuan antara seni dan arsitektur.',
    'American': 'Merayakan warisan budaya seni Amerika yang kaya, dari zaman kolonial hingga karya-karya kontemporer yang mencerminkan tradisi seni beragam di negara tersebut.',
    'European': 'Koleksi yang mencakup pencapaian seni Eropa dari abad pertengahan hingga mahakarya modern yang menunjukkan perkembangan seni di Eropa selama berabad-abad.',
    'Asian': 'Mewakili tradisi seni beragam di Asia, koleksi ini menampilkan karya-karya yang menonjolkan warisan budaya yang kaya di kawasan tersebut.',
    'African': 'Memperlihatkan karya-karya yang merayakan tradisi seni beragam di Afrika, dari artefak sejarah hingga ekspresi seni kontemporer.',
    'Modern': 'Mengeksplorasi ekspresi seni inovatif dari abad ke-20 dan seterusnya, koleksi ini menunjukkan gerakan seni modern dan perkembangannya.',
    'Contemporary': 'Mencerminkan praktik seni dan dialog terkini, koleksi ini menampilkan karya-karya dari seniman yang mendorong batas-batas seni kontemporer.',
    'Decorative': 'Menampilkan pertemuan antara seni dan fungsi, koleksi ini mempersembahkan objek indah dan fungsional dari berbagai periode.',
    'Textiles': 'Menyajikan keahlian seni tekstil, koleksi ini menunjukkan tradisi seni kain dan serat yang kaya di berbagai budaya.',
    'Ancient': 'Melestarikan artefak dari peradaban kuno, koleksi ini memberikan wawasan tentang praktik seni dan ekspresi budaya sejarah.'
  };

  const defaultDesc = (title) => {
    return `Koleksi ${title} ini merupakan kumpulan unik dari karya-karya yang menampilkan ekspresi seni khas dan signifikansi budaya dari bidang ini. Departemen ini menyimpan karya-karya penting yang memberikan kontribusi pada pemahaman kita tentang perkembangan seni dan warisan budaya.`;
  };

  for (const [key, desc] of Object.entries(descriptions)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return desc;
    }
  }

  return defaultDesc(title);
};

const GalleryScreen = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDepartments();
      if (response?.data) {
        const departmentsWithDesc = response.data.map(dept => ({
          ...dept,
          description: generateDescription(dept.title)
        }));

        const sortedDepartments = departmentsWithDesc.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });

        setDepartments(sortedDepartments);
      }
    } catch (err) {
      console.error('Error loading departments:', err);
      setError('Gagal memuat departemen');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentPress = (department) => {
    setSelectedDept(selectedDept?.id === department.id ? null : department);
  };

  const renderDepartmentCard = ({ item }) => (
    <View style={styles.departmentContainer}>
      <TouchableOpacity 
        style={[styles.departmentButton, selectedDept?.id === item.id && styles.selectedDepartment]}
        onPress={() => handleDepartmentPress(item)}
      >
        <Text style={styles.departmentTitle}>{item.title}</Text>
      </TouchableOpacity>
      
      {selectedDept?.id === item.id && (
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={loadDepartments}
        >
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={departments}
        renderItem={renderDepartmentCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default GalleryScreen;
