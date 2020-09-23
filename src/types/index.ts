export interface Photo {
    filepath: string;
    webviewPath: any;
    data: string;
}

export interface novaItem {
    id?: any;
    name: string;
    item_description: string;
    item_quantity: any;
    item_image: any;
    low_stock?: any;
}

export interface novaUser {
    id?: any;
    name: string;
    password: string;
    email: string;
    alerts: any;
    role: any;
}