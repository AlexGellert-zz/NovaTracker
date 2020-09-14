export interface Photo {
    filepath: string;
    webviewPath: any;
}

export interface novaItem {
    id?: any;
    item_name: string;
    item_description: string;
    item_quantity: any;
    item_image: Blob;
}

export interface novaUser {
    id?: any;
    username: string;
    password: string;
    email: string;
    alerts: any;
    role: any;
}