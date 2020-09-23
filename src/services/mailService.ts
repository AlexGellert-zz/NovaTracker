import Vue from 'vue';
const host = require('@/credentials.json');
const axios = require('axios').default;

export default class MailService {

    sendMail(item){
        let content = 'Item: ' + item.name + '<br> Description: ' + item.item_description + '<br> Quantity: ' + item.item_quantity;
        let low_stock = 'Low Stock: ' + item.name;
        axios.post(`https://api.elasticemail.com/v2/email/send?apikey=${host['apikey']}&subject=${low_stock}&from=deathcyth03@hotmail.com&to=deathcyth03@hotmail.com&bodyHTML=${content}`).then(res => {
            console.log("response" + JSON.stringify(res.data));
        }).catch((err) => {
            console.log(err);
        })

        // var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
        // Email.send({
        //     Host : "smtp.elasticemail.com",
        //     Username : host["username"],
        //     Password : host["password"],
        //     To : 'deathcyth03@hotmail.com',
        //     From : "deathcyth03@hotmail.com",
        //     Subject : low_stock,
        //     Body : content
        // }).then(
        //   message => console.log(message)
        // );

        
    }
}
export const mailService = new MailService();