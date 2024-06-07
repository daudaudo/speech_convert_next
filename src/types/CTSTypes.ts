import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";

type CTSPartial = {
	text: string;
	name: string;
	voice: CTSVoiceId;
	silent: number;
};

type CTSModel = OpenAITTSModel;

type CTSVoiceId = OpenAIVoiceId;

type CTSOutput = {
	id: string;
	input?: string;
	streamUrl: string;
	downloadUrl: string;
	voiceId?: CTSVoiceId;
	model?: CTSModel;
	speed?: number;
};

export type { CTSPartial, CTSModel, CTSVoiceId, CTSOutput };
