import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";
import { VoiceProvider } from "~/enums/voice";

type User = {
	id: string;
	name: string;
	voice?: CTSVoiceId;
};

type CTSPartial = {
	text: string;
	name: string;
	voice: CTSVoiceId;
	silent: number;
};

type CTSModel = OpenAITTSModel;

type CTSVoiceId = OpenAIVoiceId | string;

type CTSVoiceProvider = VoiceProvider;

export type { User, CTSPartial, CTSModel, CTSVoiceId, CTSVoiceProvider };
