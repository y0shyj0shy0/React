import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  useColorScheme,
  View,
  Appearance,
  TouchableOpacity 
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [themeMode, setThemeMode] = useState('light'); // 기본값은 'light'로 설정
  const isFocused = useIsFocused(); // 화면이 focus될 때마다 테마 모드를 확인

  useEffect(() => {
    AsyncStorage.getItem('themeMode').then((mode) => {
      if (mode) {
        setThemeMode(mode);
      }
    });
  }, [isFocused]); // 화면 focus 여부에 따라 테마 모드를 업데이트

  const handleLogin = () => {
    navigation.navigate('QRCodeScreen', { loginInfo: `${username}:${password}` });
  };

  const toggleTheme = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    // AsyncStorage에 테마 모드 저장
    AsyncStorage.setItem('themeMode', nextMode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode === 'dark' ? 'black' : 'white' }]}>
      <Image source={require('./image/KakaoTalk_20240526_184244777.png')} style={styles.image1} />
      <Image source={require('./image/goodgun.png')} style={styles.image2} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: themeMode === 'dark' ? 'white' : 'black' }]} // 텍스트 색상 설정
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          placeholderTextColor={themeMode === 'dark' ? 'gray' : '#999'} // 플레이스홀더 텍스트 색상 설정
        />
        <TextInput
          style={[styles.input, { color: themeMode === 'dark' ? 'white' : 'black' }]} // 텍스트 색상 설정
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholderTextColor={themeMode === 'dark' ? 'gray' : '#999'} // 플레이스홀더 텍스트 색상 설정
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
        <Button title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`} onPress={toggleTheme} />
      </View>
    </SafeAreaView>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [themeMode, setThemeMode] = useState('light'); // 회원가입 화면에서 테마 모드 상태 추가

  useEffect(() => {
    AsyncStorage.getItem('themeMode').then((mode) => {
      if (mode) {
        setThemeMode(mode);
      }
    });
  }, []); // 처음에만 테마 모드를 설정하도록 useEffect 설정

  const handleSignUp = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode === 'dark' ? 'black' : 'white' }]}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        placeholderTextColor={themeMode === 'dark' ? 'gray' : '#999'} // 플레이스홀더 텍스트 색상 설정
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholderTextColor={themeMode === 'dark' ? 'gray' : '#999'} // 플레이스홀더 텍스트 색상 설정
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </SafeAreaView>
  );
};

const QRCodeScreen = ({ route, navigation }) => {
  const { loginInfo } = route.params;
  const [themeMode, setThemeMode] = useState('light'); // 기본값은 'light'로 설정

  useEffect(() => {
    AsyncStorage.getItem('themeMode').then((mode) => {
      if (mode) {
        setThemeMode(mode);
      }
    });
  }, []); // 처음에만 테마 모드를 설정하도록 useEffect 설정

  const [username, password] = loginInfo.split(':'); // loginInfo에서 username과 password를 분리

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.description1, { color: themeMode === 'dark' ? 'white' : 'black' }]}>결식 확인을 위해 QR코드를 스캔해주세요.</Text>
      <View style={styles.qrContainer}>
        <QRCode value={loginInfo} size={200} />
        <Button title="Close" onPress={() => navigation.navigate('MainScreen')} />
      </View>
      <Text style={[styles.description2, { color: themeMode === 'dark' ? 'white' : 'black' }]}>여러분의 결식은 부모님, 친척들의 피와 땀이 담긴 노력의 낭비입니다.</Text>
      <Text style={[styles.description2, { color: themeMode === 'dark' ? 'white' : 'black' }]}>ID: {username}</Text>
      <Text style={[styles.description2, { color: themeMode === 'dark' ? 'white' : 'black' }]}>Password: {password}</Text>
    </SafeAreaView>
  );
};
// Product data
const products = [
  { unit: '부대1', name: 'product1', stock: Math.floor(Math.random() * 100) },
  { unit: '부대1', name: 'product2', stock: Math.floor(Math.random() * 100) },
  { unit: '부대1', name: 'product3', stock: Math.floor(Math.random() * 100) },
  { unit: '부대2', name: 'product1', stock: Math.floor(Math.random() * 100) },
  { unit: '부대2', name: 'product2', stock: Math.floor(Math.random() * 100) },
  { unit: '부대2', name: 'product3', stock: Math.floor(Math.random() * 100) },
];

const MainScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [showNews, setShowNews] = useState(true);

  const selectUnit = (unit) => {
    setSelectedUnit(unit);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowNews(false);
  };

  const searchProduct = async () => {
    try {
      setSearchResults(products.filter(product => product.unit === selectedUnit && product.name.includes(searchTerm)));
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ paddingHorizontal: 20 }}>
          <Image source={require('./image/KakaoTalk_20240526_184244777.png')} style={styles.image3} />
          <Text style={styles.sectionTitle}>카테고리 선택</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={[styles.categoryButton, selectedCategory === 'px' && styles.selectedCategory]} onPress={() => selectCategory('px')}>
              <Text style={styles.categoryButtonText}>PX 재고 검색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryButton, selectedCategory === 'menu' && styles.selectedCategory]} onPress={() => selectCategory('menu')}>
              <Text style={styles.categoryButtonText}>부대 식단표</Text>
            </TouchableOpacity>
          </View>
          
          {selectedCategory === 'px' && (
            <>
              <Text style={styles.sectionTitle}>부대 선택</Text>
              <View style={styles.unitContainer}>
                <TouchableOpacity style={[styles.unitButton, selectedUnit === '부대1' && styles.selectedUnit]} onPress={() => selectUnit('부대1')}>
                  <Text style={styles.unitButtonText}>부대1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.unitButton, selectedUnit === '부대2' && styles.selectedUnit]} onPress={() => selectUnit('부대2')}>
                  <Text style={styles.unitButtonText}>부대2</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>상품 검색</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="검색어를 입력하세요."
                  onChangeText={text => setSearchTerm(text)}
                  value={searchTerm}
                />
                <Button title="검색" onPress={searchProduct} />
              </View>
              <View>
                <Text style={styles.sectionTitle}>검색 결과</Text>
                {searchResults.map((product, index) => (
                  <TouchableOpacity key={index} style={styles.productItem}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productStock}>재고: {product.stock}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          {selectedCategory === 'menu' && (
            <View>
              <Text style={styles.sectionTitle}>부대 식단표</Text>
              <Text style={styles.sectionDescription}>부대 식단표 내용을 여기에 표시합니다.</Text>
            </View>
          )}
        </View>
        {showNews && (
          <View style={{paddingTop: 20}}>
            <Text style={styles.sectionTitle}>군 뉴스</Text>
            <Text style={styles.sectionDescription}>여기에 군 뉴스와 관련된 내용을 표시합니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>
        {title}
      </Text>
      <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark }]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // 배경색 변경
    padding: 32, // 전체 여백 조정
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  searchContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image1: {
    width: 250, // 이미지 크기 조정
    height: 80, // 이미지 크기 조정
    marginBottom: 40, // 이미지 간격 조정
  },
  image2: {
    width: 120, // 이미지 크기 조정
    height: 160, // 이미지 크기 조정
    marginBottom: 40, // 이미지 간격 조정
  },
  image3: {
    width: 300, // 이미지 크기 조정
    height: 100, // 이미지 크기 조정
    marginBottom: 40, // 이미지 간격 조정
  },
  inputContainer: {
    width: '100%', // 폭을 꽉 채우도록 조정
    alignItems: 'center',
    marginBottom: 40, // 입력 폼과 버튼 간격 조정
  },
  input: {
    height: 50, // 입력 폼 높이 조정
    borderColor: '#ccc', // 테두리 색상 변경
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20, // 입력 폼 내부 여백 조정
    width: '100%',
    borderRadius: 10, // 입력 폼 모서리 둥글게 만들기
  },
  button: {
    backgroundColor: '#007bff', // 버튼 색상 변경
    paddingHorizontal: 40, // 버튼 내부 여백 조정
    paddingVertical: 10,
    borderRadius: 10, // 버튼 모서리 둥글게 만들기
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 100, // QR 코드와 버튼 간격 조정
    marginTop: 100
  },
  description1: {
    marginTop: 40, // 첫 번째 텍스트 위로 이동
    fontSize: 25, // 텍스트 크기 증가
    color: '#555',
    textAlign: 'center',
    marginBottom: 20, // 두 번째 텍스트와의 간격 조정
  },
  description2: {
    fontSize: 18, // 두 번째 텍스트 크기 변경
    color: '#555',
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 12, // 버튼 크기 변경
    paddingHorizontal: 24, // 버튼 크기 변경
    backgroundColor: '#007bff',
    borderRadius: 25, // 더 둥근 버튼
    width: '80%', // 버튼 폭 조정
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedUnit: {
    backgroundColor: 'skyblue', // 선택된 부대의 배경색 변경
  },
  productItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;


