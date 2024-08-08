export type ReferenceGoogleCloudVoice = {
	languageCodes: string[];
	name: string;
	ssmlGender: "FEMALE" | "MALE";
	naturalSampleRateHertz: number;
};

export type ReferenceGoogleVoiceResponseData = ReferenceGoogleCloudVoice[];
