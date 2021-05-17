export type ArtInfo = {
    _id: string;
    key: string;
    size: number;
    src: string;
    isApproved: boolean;
    uploadedAt: string;
    user: {
        instagram?: string;
    }
}