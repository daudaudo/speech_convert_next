type HeroIconType = React.ForwardRefExoticComponent<
	Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
		title?: string | undefined;
		titleId?: string | undefined;
	} & React.RefAttributes<SVGSVGElement>
>;

type SvgProps = {
	width?: number | string;
	height?: number | string;
	color?: string;
};

type SpeechConvertIcon = HeroIconType;

export type { SpeechConvertIcon, SvgProps };
