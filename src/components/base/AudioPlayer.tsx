"use client";

import React from "react";
import H5AudioPlayer from "react-h5-audio-player";
import { AUDIO_PRELOAD_ATTRIBUTE } from "react-h5-audio-player/lib/constants";
import "react-h5-audio-player/lib/styles.css";

interface AudioPlayerProps {
	// Controls Props
	autoPlay?: boolean;
	src: string;
	preload?: AUDIO_PRELOAD_ATTRIBUTE;
	loop?: boolean;
	mute?: boolean;
	volume?: number;
	// Event Props
	onAbort?: (e: Event) => void;
	onCanPlay?: (e: Event) => void;
	onCanPlayThrough?: (e: Event) => void;
	onEnded?: (e: Event) => void;
	onPlaying?: (e: Event) => void;
	onSeeking?: (e: Event) => void;
	onSeeked?: (e: Event) => void;
	onStalled?: (e: Event) => void;
	onSuspend?: (e: Event) => void;
	onLoadStart?: (e: Event) => void;
	onLoadedMetaData?: (e: Event) => void;
	onLoadedData?: (e: Event) => void;
	onWaiting?: (e: Event) => void;
	onEmptied?: (e: Event) => void;
	onError?: (e: Event) => void;
	onListen?: (e: Event) => void;
	onVolumeChange?: (e: Event) => void;
	onPause?: (e: Event) => void;
	onPlay?: (e: Event) => void;
	onClickPrevious?: (e: React.SyntheticEvent) => void;
	onClickNext?: (e: React.SyntheticEvent) => void;
	onPlayError?: (err: Error) => void;
	onChangeCurrentTimeError?: () => void;
	// UI/UX Props
	// Style Props
	className?: string;
	style?: React.CSSProperties;
}

const AudioPlayer: React.FC<AudioPlayerProps> = (props: AudioPlayerProps) => {
	const { autoPlay = true, src, volume = 0.8, ...restProps } = props;
	return <H5AudioPlayer autoPlay={autoPlay} src={src} volume={volume} {...restProps} />;
};

export default AudioPlayer;
