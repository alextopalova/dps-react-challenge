/**
 * Example data
 * {
 * 	"postalCode": "07589",
 * 	"name": "Münchenbernsdorf",
 * 	"municipality": {
 * 	"key": "16076049",
 * 		"name": "Münchenbernsdorf, Stadt",
 * 		"type": "Stadt"
 * },
 * 	"district": {
 * 	"key": "16076",
 * 		"name": "Greiz",
 * 		"type": "Landkreis"
 * },
 * 	"federalState": {
 * 	"key": "16",
 * 		"name": "Thüringen"
 * }
 * }
 */

export interface LocalityItem {
	postalCode: string;
	name: string;
	municipality: MunicipalityDistrict;
	district?: MunicipalityDistrict;
	federalState: FederalState;
}

interface MunicipalityDistrict {
	key: string;
	name: string;
	type: string;
}

interface FederalState {
	key: string;
	name: string;
}

export default LocalityItem;
