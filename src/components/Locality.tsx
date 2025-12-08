import { Field, FieldDescription, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useEffect } from 'react';
import { showErrorToast } from '@/lib/utils.ts';

interface LocalityProps {
	localityValue: string;
	handleChange: (val: string) => void;
	error?: string;
	disabled: boolean;
}

const Locality = ({ localityValue, handleChange, error, disabled}: LocalityProps) => {

	useEffect(() => {
		if (error) {
			showErrorToast(error);
		}
	}, [error]);

	return (
		<div className="w-full max-w-md">
			<Field>
				<FieldLabel htmlFor="locality">City/Town name</FieldLabel>
				<Input
					id="locality"
					type="text"
					placeholder="Example city"
					value={localityValue}
					onChange={(e) => handleChange(e.target.value)}
					disabled={disabled}
				/>
				<FieldDescription>
					{disabled ? "The postal code corresponds to this city/town" : "Type the name of a city/town"}
				</FieldDescription>
			</Field>
		</div>
	);
};

export default Locality;
