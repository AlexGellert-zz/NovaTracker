import Vue from 'vue';
import { novaItem, novaUser } from '@/types/index';
const axios = require('axios').default;

/**
 * This service talks to the novaInventory.php API
 * to cover all the CRUD involving the database.
 */
export default class DataBaseAPI {
    public state = Vue.observable({ itemList: <novaItem[]>[], userList: <novaUser[]>[] });

    /**  INVENTORY RELATED CALLS **/
    public async readInventory() {
        let formData = new FormData();
        formData.append('readItems', "readItems");
        axios({ method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData }
        ).then(res => {
            this.state.itemList = res.data;
            console.log('Inventory' + res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    
    public async newItem(item: novaItem){
        let formData = new FormData();
        formData.append('insertItem', "insertItem");
        formData.append('item_name', item.item_name);
        formData.append('item_description', item.item_description);
        formData.append('item_quantity', item.item_quantity);
        formData.append('item_image', item.item_image);
        formData.append('stock', item.stock);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('item added' + item);
        }).catch((err) => {
            console.log('item added' + err);
        })
    }

    public async updateItem(item: novaItem){
        let formData = new FormData();
        formData.append('updateItem', "updateItem");
        formData.append('id', item.id);
        formData.append('item_name', item.item_name);
        formData.append('item_description', item.item_description);
        formData.append('item_quantity', item.item_quantity);
        formData.append('item_image', item.item_image);
        formData.append('stock', item.stock);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('item added' + item);
        }).catch((err) => {
            console.log('item added' + err);
        })
    }

    public async deleteItem(id){
        let formData = new FormData();
        formData.append('deleteItem', "deleteItem");
        formData.append('id', id);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('item deleted' + id);
        }).catch((err) => {
            console.log('item deleted' + err);
        })
    }

    /*** USER RELATED CALLS ***/
    public async readUsers() {
        let formData = new FormData();
        formData.append('readUsers', "readUsers");
        axios({ method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData }
        ).then(res => {
            this.state.userList = res.data;
            console.log('users' + res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    public async newUser(user: novaUser){
        let formData = new FormData();
        formData.append('newUser', "newUser");
        formData.append('username', user.username);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('roles', user.role);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('user added' + user);
        }).catch((err) => {
            console.log('user added' + err);
        })
    }

    public async updateUser(user: novaUser){
        let formData = new FormData();
        formData.append('updateUser', "updateUser");
        formData.append('id', user.id);
        formData.append('username', user.username);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('roles', user.role);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('item updated' + user);
        }).catch((err) => {
            console.log('item updated' + err);
        })
    }

    public async deleteUser(user: novaUser){
        let formData = new FormData();
        formData.append('deleteUser', "deleteUser")
        formData.append('id', user.id);
        axios({method: 'post', url: 'http://localhost/api/novaInventory.php', data: formData}
        ).then(() => {
            console.log('item deleted' + user);
        }).catch((err) => {
            console.log('item deleted' + err);
        })
    }
    
}
export const dataBaseAPI = new DataBaseAPI();