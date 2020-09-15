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
    public state = Vue.observable({ itemHashObject: <Object>{}, userHashObject: <Object>{}, currentUser: <novaUser>{} });

    /** Hash Object **/
    public hashObject(data){
        let tempArray = new Array();
        let hashObject = {};
        for(let i in data){
            let key = data[i].name.toLowerCase();
            let obj: any = data[i];
            if(!tempArray[key]){
                tempArray[key] = {key: key, value: obj};
            }
        }
        hashObject = tempArray;
        console.log("-------------------- hashobject below this line --------------------");
        console.log(hashObject);
        return hashObject;
    }

    /** Get Current User **/
    public getCurrentUser(){
        return this.state.currentUser;
    }
    /** Check Valid User **/
    public login(username: string, password: string){
        if(this.state.userHashObject[username].value.password == password){
            this.state.currentUser = this.state.userHashObject[username].value;
            console.log(this.state.currentUser);
            return true;
        }
        return false;
    }

    /** Check New User **/
    public checkUser(name){
        if(this.state.userHashObject[name]){
            return true;
        } else{
            return false;
        }
    }

    /** Check New Item **/
    public checkItem(name){
        if(this.state.itemHashObject[name]){
            return true;
        } else{
            return false;
        }
    }

    /** Find User or Item **/
    public getUser(name): novaUser{
        if(this.state.userHashObject[name]){
            return <novaUser>this.state.userHashObject[name].value;
        }
        return {name: "",password: "",email: "",alerts: 0,role: "",};
    }

    public getItem(name): novaItem{
            if(this.state.itemHashObject[name]){
                return <novaItem>this.state.itemHashObject[name].value;
            }
        return {name: "", item_description: "", item_quantity: 0, item_image: ""};
    }

    /**  INVENTORY RELATED CALLS **/
    public async readInventory() {
        let formData = new FormData();
        formData.append('readItems', "readItems");
        axios({ method: 'post', url: `${host["local"]}`, data: formData }
        ).then(res => {
            this.state.itemHashObject = this.hashObject(res.data);
            console.log('Inventory list ' + this.state.itemHashObject['alex'].key);
        }).catch((err) => {
            console.log(err);
        })
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
            console.log('newItem API response: ' + res.data);
        }).catch((err) => {
            console.log('item added' + err);
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
            console.log('item added' + item);
        }).catch((err) => {
            console.log('item added' + err);
        })
    }

    public async deleteItem(id){
        let formData = new FormData();
        formData.append('deleteItem', "deleteItem");
        formData.append('id', id);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
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
        axios({ method: 'post', url: `${host["local"]}`, data: formData }
        ).then(res => {
            this.state.userHashObject = this.hashObject(res.data);
            console.log('user ' + this.state.userHashObject['member'].key);
        }).catch((err) => {
            console.log(err);
        })
    }

    public async newUser(user: novaUser){
        let formData = new FormData();
        formData.append('newUser', "newUser");
        formData.append('name', user.name);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('roles', user.role);
        console.log("formData" + formData['name']);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
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
        formData.append('name', user.name);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('alerts', user.alerts);
        formData.append('roles', user.role);
        axios({method: 'post', url: `${host["local"]}`, data: formData}
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
        axios({method: 'post', url: `${host["local"]}`, data: formData}
        ).then(() => {
            console.log('item deleted' + user);
        }).catch((err) => {
            console.log('item deleted' + err);
        })
    }
    
}
export const dataBaseAPI = new DataBaseAPI();