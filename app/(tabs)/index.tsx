import { Image, StyleSheet, ScrollView, View, TextInput, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps'
import { useEffect, useState } from 'react';
import { IProps, TD } from '@/types/data';
import { useZipcode, getProperties } from '@/hooks/useZipcode';
import Icon from '@/components/common/Icon';

export default function HomeScreen() {
  const [ zipCode, setZipCode ] = useState('')
  const [ getData, setGetData ] = useState(false)
  const [props, setProps] = useState<IProps[] | undefined>([])

  const getIt = async () => {
    const cityByCode: TD = await useZipcode({ zipcode: `${zipCode}` }) as unknown as TD
    console.log(cityByCode)
    if (cityByCode) {
      const foundProps: IProps[] | undefined = await getProperties({cityName: cityByCode.city, stateCode: cityByCode.state})
      setProps(foundProps)
      console.log(cityByCode)
    }
}

  useEffect(() => {
    if (getData === true) {
      getIt()
      setGetData(false)
    }
  }, [getData])
  return (
    <>
    <ScrollView style={{backgroundColor: 'white', flexDirection: 'column', padding: 20}} contentContainerStyle={{justifyContent: 'center'}}>
      <Icon
            src={require('@/assets/images/logo.png')}
            style={{width: 120, height: 150, alignSelf: 'center', objectFit: 'contain'}}
          />
      <Text>Search</Text>
      <TextInput placeholder={'ZipCode'} onChangeText={(val) => { setZipCode(val) }} style={{ padding: 10, border: '2px solid #ccc', borderRadius: 5, marginTop: 10 }} onBlur={() => setGetData(true)} />
      <View>
            <Text style={{fontSize: 30}}>Property Listings</Text>
            <ScrollView style={{ marginVertical: 10 }}>
            <MapView
              style={{ ...StyleSheet.absoluteFillObject }}
              initialRegion={{
                latitude: 37.1,
                longitude: -95.7,
                latitudeDelta: 10,
                longitudeDelta: 45
              }} >
            </MapView>
            {props && props?.map((property, index) => (
                  <>
                    <Marker
                      key={index}
                      coordinate={{ latitude: property.latitude, longitude: property.longitude }}
                      title={property.address}
                      description={property.description}
                    >
                    </Marker >
                    <View key={index} style={{ borderWidth: 2, borderColor: '#c1c1c1', borderRadius: 30, padding: 20}}>
                        <Text style={{fontSize: 24, marginBottom: 10}}>{property.address}</Text>
                        <Text style={{marginBottom: 10}}>{property.description}</Text>
                        <Text style={{marginBottom: 10}}>Price: ${property.price}</Text>
                        {property.image && <Image 
                        source={{
                          uri: property.image ?? 'https://reactnative.dev/img/tiny_logo.png',
                        }} alt={`Image of ${property.address}`} style={{width: 150, height: 150}} />}
                    </View>
                  </>
                ))}
            </ScrollView>
        </View>
    </ScrollView>
    </>
  );
}
