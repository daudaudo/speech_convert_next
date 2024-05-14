export enum MimeFile {
	// Image
	JPEG = "image/jpeg",
	PNG = "image/png",
	GIF = "image/gif",
	BMP = "image/bmp",
	SVG = "image/svg+xml",

	// Audio
	MP3 = "audio/mpeg",
	WAV = "audio/wav",
	OGG = "audio/ogg",
	AAC = "audio/aac",

	// Video
	MP4 = "video/mp4",
	WEBM = "video/webm",
	AVI = "video/x-msvideo",
	MOV = "video/quicktime",
	MKV = "video/x-matroska",

	// Application
	JSON = "application/json",
	PDF = "application/pdf",
	ZIP = "application/zip",
	DOC = "application/msword",
	DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	XLS = "application/vnd.ms-excel",
	XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	PPT = "application/vnd.ms-powerpoint",
	PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	XML = "application/xml",
	HTML = "text/html",
	TXT = "text/plain",
}

export enum FileSizeUnit {
	BYTE = "B",
	KILOBYTE = "KB",
	MEGABYTE = "MB",
	GIGABYTE = "GB",
	TERABYTE = "TB",
	PETABYTE = "PB",
	EXABYTE = "EB",
	ZETTABYTE = "ZB",
	YOTTABYTE = "YB",
}
