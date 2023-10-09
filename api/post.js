const URL = "https://videocomp.onrender.com"
// const URL = "http://localhost:3002"

export async function InsertPost(form) {

    const url =  `${URL}/insert`

    const params = {
        method : "POST",
        headers : {
            "Content-Type" : "multipart/form-data"
        },
        body : form,
    }

    return await fetch(url,params).then(res => {
        return res.json();
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });

}

export async function GetPosts() {

    const url =  `${URL}/getAll`

    const params = {
        method : "GET",
    }

    return await fetch(url,params).then(res => {
        return res.json();
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });

}

export async function Test(form) {

    const url = `${URL}/test`

    const params = {
        method : "POST",
        body : JSON.stringify(form),
    }

    return await fetch(url,params).then(res => {
        return res.json();
    }).then(res => {
        return res;
    }).catch(err => {
        return err
    });

}