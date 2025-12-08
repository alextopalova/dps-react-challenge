import './App.css';
import Locality from '@/components/Locality.tsx';
import PostalCode from '@/components/PostalCode.tsx';
import { useEffect, useEffectEvent, useState } from 'react';
import { FieldSet } from '@/components/ui/field.tsx';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
	getLocalitiesByPostalCode,
	getPostalCodesByLocality
} from '@/data/dataLoaders.ts';
import { Toaster } from 'sonner';
import LookupModeButton from '@/components/LookupModeButton.tsx';
import { LookupMode } from '@/interfaces/LookupMode.ts';

function App() {
	const [localityValue, setLocalityValue] = useState('');
	const [postalCodeValue, setPostalCodeValue] = useState('');
	const [localityError, setLocalityError] = useState('');
	const [postalError, setPostalError] = useState('');
	const [lookupMode, setLookupMode] = useState<string>(
		LookupMode.Locality
	);

	const isLocalityMode = lookupMode === LookupMode.Locality;
	const isPostalMode = lookupMode === LookupMode.PostalCode;

	const localityQuery = useQuery({
		queryKey: ['localityValue', localityValue],
		queryFn: () => getPostalCodesByLocality(localityValue),
		enabled: isLocalityMode && localityValue.trim().length > 1,
		// Shows post codes only for exact name matches, e.g. if searching for Ulm, Obersulm would be filtered out
		select: (data) =>
			[...new Set(
				data
					.filter(item => item.name === localityValue)
					.map(item => item.postalCode)
			)],
		retry: false
	});

	const postalQuery = useQuery({
		queryKey: ['postalCodeValue', postalCodeValue],
		queryFn: () => getLocalitiesByPostalCode(postalCodeValue),
		enabled: isPostalMode && postalCodeValue.length === 5,
		select: (data) => [...new Set(data.map(item => item.name))],
		retry: false
	});

	const postalCodeOptions = localityQuery.data ?? undefined;

	// ------- Update postal code
	const updatePostalCode = useEffectEvent(
		(
			postalCodeOptions: string[] | undefined
		) => {
			if (!isLocalityMode) return;

			if (postalCodeOptions && postalCodeOptions.length === 1) {
				setPostalCodeValue(postalCodeOptions[0]);
				setPostalError('');
			} else if (
				postalCodeOptions &&
				postalCodeOptions.length === 0 &&
				localityValue.trim().length > 1
			) {
				setLocalityError('No postal codes found for this locality');
			} else {
				setLocalityError("");
			}
		}
	);

	useEffect(() => {
		updatePostalCode(postalCodeOptions);
	}, [
		postalCodeOptions,
		localityValue,
		isLocalityMode
	]);

	// ------- Update locality
	const updateLocality = useEffectEvent(
		(postalQuery: UseQueryResult<string[], Error>) => {
			if (!isPostalMode) return;

			if (postalQuery.data && postalQuery.data.length > 0) {
				setLocalityValue(postalQuery.data[0]);
				setPostalError('');
			} else if (postalQuery.isError && postalCodeValue.length === 5) {
				setPostalError('Invalid postal code');
			} else if (
				postalQuery.data &&
				postalQuery.data.length === 0 &&
				postalCodeValue.length === 5
			) {
				setPostalError('Invalid postal code');
			}
		}
	);

	useEffect(() => {
		updateLocality(postalQuery);
	}, [
		postalCodeValue,
		postalQuery,
		isPostalMode
	]);

	// ------- Handle mode change
	const handleModeChange = (mode: string) => {
		setLookupMode(mode);
		setLocalityError('');
		setPostalError('');
		setLocalityValue('');
		setPostalCodeValue('');
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-8">
			<FieldSet className="flex flex-col w-full max-w-md">
				<LookupModeButton
					lookupMode={lookupMode}
					handleChange={handleModeChange}
				/>

				<div className={isLocalityMode ? 'order-1' : 'order-2'}>
					<Locality
						localityValue={localityValue}
						handleChange={setLocalityValue}
						error={localityError}
						disabled={isPostalMode}
					/>
				</div>
				<div className={isLocalityMode ? 'order-2' : 'order-1'}>
					<PostalCode
						postalCodesValue={postalCodeValue}
						postalCodeOptions={postalCodeOptions}
						handleChange={setPostalCodeValue}
						error={postalError}
						disabled={isLocalityMode}
					/>
				</div>
			</FieldSet>
			<Toaster position="bottom-right" />
		</div>
	);
}

export default App;
