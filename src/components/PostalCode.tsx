import { Field, FieldDescription, FieldLabel } from '@/components/ui/field.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { showErrorToast } from '@/lib/utils.ts';

interface PostalCodeProps {
	postalCodesValue: string;
	postalCodeOptions: string[] | undefined;
	handleChange: (val: string) => void;
	error?: string;
	disabled: boolean;
}

const PostalCode = ({
	postalCodesValue,
	postalCodeOptions,
	handleChange,
	error,
	disabled,
}: PostalCodeProps) => {

	useEffect(() => {
		if (error) {
			showErrorToast(error);
		}
	}, [error]);

	if (postalCodeOptions && postalCodeOptions.length > 1) {
		return (
			<div className="w-full max-w-md">
				<Field>
					<FieldLabel htmlFor="postalCode">
						Postal Code (PLZ)
					</FieldLabel>
					<Select
						value={postalCodesValue}
						onValueChange={handleChange}
					>
						<SelectTrigger>
							<SelectValue placeholder="Choose a postal code (PLZ)" />
						</SelectTrigger>
						<SelectContent>
							{postalCodeOptions.map((postalCode, index) => (
								<SelectItem
									key={index}
									value={postalCode}
								>
									{postalCode}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldDescription>
						The postal code corresponding to the city/town
					</FieldDescription>
				</Field>
			</div>
		);
	}

	return (
		<div className="w-full max-w-md">
			<Field>
				<FieldLabel htmlFor="postalCode">Postal Code (PLZ)</FieldLabel>
				<Input
					id="postalCode"
					type="text"
					placeholder="12345"
					value={postalCodesValue}
					onChange={(e) => handleChange(e.target.value)}
					maxLength={5}
					disabled={disabled}
				/>
				<FieldDescription>{disabled ? 'The postal code corresponding to the city/town' : 'Type the postal code (PLZ)'}</FieldDescription>
			</Field>
		</div>
	);
};

export default PostalCode;
