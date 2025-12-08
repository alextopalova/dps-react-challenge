import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import { LookupMode } from '@/interfaces/LookupMode.ts';

interface LookupModeButtonProps {
	lookupMode: string;
	handleChange: (val: string) => void;
}

const LookupModeButton = ({
	lookupMode,
	handleChange,
}: LookupModeButtonProps) => {
	return (
		<Field>
			<FieldLabel htmlFor="lookupMode">
				Choose which attribute to look up by:
			</FieldLabel>
			<RadioGroup value={lookupMode} onValueChange={handleChange}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value={LookupMode.Locality} id="localityMode" />
					<Label htmlFor="localityMode">Locality</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value={LookupMode.PostalCode}
						id="postalCodeMode"
					/>
					<Label htmlFor="postalCodeMode">Postal Code</Label>
				</div>
			</RadioGroup>
		</Field>
	);
};

export default LookupModeButton;
