export type UploadingFile = {
	id: string;
	name: string;
	key?: string;
	progress: number;
	error: boolean;
	task: {
		cancel: (...args) => void;
		pause: (...args) => void;
		resume: (...args) => void;
	};
	state: string;
};

export enum Provider {
	s3,
}

export type DriveFile = {
	name: string;
	url?: string;
	parent: string;
	fullPath: string;
	bucketName?: string;
	bucketUrl?: string;
	size?: string;
	contentType?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type DriveFolder = {
	name: string;
	parent: string;
	fullPath: string;
	bucketName?: string;
	bucketUrl?: string;
	createdAt?: string;
	updatedAt?: string;
};
