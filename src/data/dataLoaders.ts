import axios from 'axios';
import LocalityItem from '@/interfaces/LocalityItem.ts';

const baseURL = 'https://openplzapi.org/de/Localities';

export const api = axios.create({
	baseURL: baseURL,
});

export const getPostalCodesByLocality = async (
	localityName: string,
): Promise<LocalityItem[]> => {
	const res = await api.get<LocalityItem[]>(`?name=${localityName}`);
	console.log('getPostalCodesByLocality', res.data);
	return res.data;
};

export const getLocalitiesByPostalCode = async (
	postalCode: string,
): Promise<LocalityItem[]> => {
	const res = await api.get<LocalityItem[]>(`?postalCode=${postalCode}`);
	console.log('getLocalitiesByPostalCode', res.data);
	return res.data;
};
