import Vue from 'vue';
import { novaItem, novaUser } from '@/types/index';
const host = require('@/credentials.json');
const axios = require('axios').default;

enum Type{
    "user" = 1,
    "item" = 2
}

/**
 * This service talks to the novaInventory.php API
 * to cover all the CRUD involving the database.
 */
export default class DataBaseAPI {
    public state = Vue.observable({ currentUser: <novaUser>{} });

    /** Get Current User **/
    public getCurrentUser(){
        return this.state.currentUser;
    }
    /** Check Valid User **/
    public async login(username: string, password: string){
        let userList = await this.readUsers();
        for(let i in userList){
            if(username == userList[i].name && password == userList[i].password){
                this.state.currentUser = userList[i];
                return true;
            }
        }
        return false;
    }

    /** Check New User **/
    public async checkUser(name){
        let userList = await this.readUsers();
        console.log('checkUser ' + userList)
        for(let i in userList){
            if(userList[i].name.toLowerCase() == name.toLowerCase()){
                return false;
            }
        }
        return true;
    }

    /** Check Item Name **/
    
    public async checkItemName(name){
        let itemList = await this.readInventory();
        for(let i in itemList){
            if(itemList[i].name == name){
                return false;
            }
        }
        return true;
    }
    /**  INVENTORY RELATED CALLS **/
    public async readInventory(){
        let formData = new FormData();
        formData.append('readItems', "readItems");
        let newList = axios({ method: 'post', url: `${host["local"]}`, data: formData }
        ).then(res => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
        return newList;
    }
    
    public async newItem(item: novaItem){
        let formData = new FormData();
        formData.append('insertItem', "insertItem");
        formData.append('name', item.name);
        formData.append('item_description', item.item_description);
        formData.append('item_quantity', item.item_quantity);
        formData.append('item_image', item.item_image);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then((res) => {
            console.log("item added " + res)
        }).catch((err) => {
            console.log('item added ' + err);
        })
    }

    public async updateItem(item: novaItem){
        let formData = new FormData();
        formData.append('updateItem', "updateItem");
        formData.append('id', item.id);
        formData.append('name', item.name);
        formData.append('item_description', item.item_description);
        formData.append('item_quantity', item.item_quantity);
        formData.append('item_image', item.item_image);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('item updated ' + item);
        }).catch((err) => {
            console.log('item added ' + err);
        })
    }

    public async findItem(id){
        let formData = new FormData();
        formData.append('findItem', 'findItem');
        formData.append('id', id);
        let tempItem = await axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then((res) => {
            console.log('item found ' + res.data[0]);
            return res.data[0];
        }).catch((err) => {
            console.log('item found ' + err);
        });
        return tempItem;
    }

    public async deleteItem(id){
        let formData = new FormData();
        formData.append('deleteItem', "deleteItem");
        formData.append('id', id);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('item deleted: ' + id);
        }).catch((err) => {
            console.log('item deleted' + err);
        })
    }

    /*** USER RELATED CALLS ***/
    public async readUsers() {
        let formData = new FormData();
        formData.append('readUsers', "readUsers");
        let newList = await axios({ method: 'post', url: `${host["local"]}`, data: formData }
        ).then(res => {
            console.log('user ' + res.data);
            return res.data;
        }).catch((err) => {
            console.log(err);
        })
        console.log('returning list ' + newList)
        return newList;
    }

    public async newUser(user: novaUser){
        let formData = new FormData();
        formData.append('newUser', "newUser");
        formData.append('name', user.name);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('role', user.role);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('user added ' + user);
        }).catch((err) => {
            console.log('user added ' + err);
        })
    }

    public async updateUser(user: novaUser){
        let formData = new FormData();
        formData.append('updateUser', "updateUser");
        formData.append('id', user.id);
        formData.append('name', user.name);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('role', user.role);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('item updated ' + user);
        }).catch((err) => {
            console.log('item updated ' + err);
        })
    }

    public async findUser(id){
        let formData = new FormData();
        formData.append('findUser', 'findUser');
        formData.append('id', id);
        let tempUser = await axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then((res) => {
            console.log('user found ' + res.data);
            return res.data[0];
        }).catch((err) => {
            console.log('user found ' + err);
        })
        return tempUser;
    }

    public async findUserName(name){
        let formData = new FormData();
        formData.append('findUserName', 'findUserName');
        formData.append('name', name);
        let tempUser = await axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then((res) => {
            console.log('user found ' + res.data);
            return res.data[0];
        }).catch((err) => {
            console.log('user found ' + err);
        })
        
        return tempUser;
    }

    public async deleteUser(id){
        let formData = new FormData();
        formData.append('deleteUser', "deleteUser")
        formData.append('id', id);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('item deleted ' + id);
        }).catch((err) => {
            console.log('item deleted ' + err);
        })
    }
    
}
export const dataBaseAPI = new DataBaseAPI();