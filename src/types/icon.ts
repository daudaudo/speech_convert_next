type HeroIconType = React.ForwardRefExoticComponent<
	Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
		title?: string | undefined;
		titleId?: string | undefined;
	} & React.RefAttributes<SVGSVGElement>
>;

type SpeechConvertIcon = HeroIconType;

export type { SpeechConvertIcon, HeroIconType };
