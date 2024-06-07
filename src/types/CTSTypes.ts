import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";

type User = {
	id: string;
	name: string;
	voice: CTSVoiceId;
};

type CTSPartial = {
	text: string;
	name: string;
	voice: CTSVoiceId;
	silent: number;
};

type CTSModel = OpenAITTSModel;

type CTSVoiceId = OpenAIVoiceId;

export type { User, CTSPartial, CTSModel, CTSVoiceId };
