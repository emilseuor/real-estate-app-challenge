
import * as zipcodes from 'zipcodes'
import axios from 'axios'
import propertiesData from '@/assets/data/properties.json'
import { IProps } from '@/types/data';

export const useZipcode = async (
    props: { zipcode?: string; },
  ) => {
    const { zipcode } = props
    const location = zipcodes.lookup(`${zipcode}`);
    return location
  }

  export const getPropertiesFromApi = async (props: {cityName: string, stateCode: string}) => {
    const { cityName, stateCode } = props

    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/location/for-sale-nearby-areas',
      params: {
        area_type: 'city',
        city: cityName,
        state_code: stateCode
      },
      headers: {
        'x-rapidapi-key': 'ad4d076c3bmshc4720ffaebc25d8p1b59a0jsndec77a31dd93',
        'x-rapidapi-host': 'us-real-estate.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    return response
  }

  export const getProperties = async (props: {cityName: string, stateCode: string}) => {
    const { cityName, stateCode } = props
    const filteredProps: IProps[] = propertiesData.filter(item => item.city === cityName || item.state === stateCode)
    return filteredProps
  }