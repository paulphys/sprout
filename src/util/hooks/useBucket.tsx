import { DriveFile, DriveFolder, Provider, UploadingFile } from "@util/types";
import useKeys from "./useKeys";
import useS3 from "./useS3";

export type ContextValue = {
	loading: boolean;
	currentFolder: DriveFolder;
	folders: DriveFolder[];
	files: DriveFile[];
	uploadingFiles: UploadingFile[];
	setUploadingFiles: React.Dispatch<React.SetStateAction<UploadingFile[]>>;
	addFolder: (name: string) => void;
	removeFolder: (folder: DriveFolder) => Promise<void>;
	addFile: (files: File[] | FileList) => Promise<void>;
	removeFile: (file: DriveFile) => Promise<boolean>;
};

export const ROOT_FOLDER: DriveFolder = {
	name: "",
	fullPath: "",
	parent: null,
	bucketName: null,
	bucketUrl: null,
};

export default function useBucket(): ContextValue {
	const { keys } = useKeys();

	if ((Provider[keys.type] as Provider) === Provider.s3) {
		return useS3();
	}

	return null;
}
