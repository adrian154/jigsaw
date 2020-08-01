const authUser = function(email, password) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            
            let res;
            try {
                res = JSON.parse(req.response);
            } catch(error) {
                reject("The server responded with invalid JSON.");
            }
            
            if(req.status == 200) {
                if(res.key) {
                    resolve(res.key);
                } else {
                    reject("The server's response was missing the session key.");
                }
            } else {
                reject(res.message);
            }
        };
        req.open("POST", "/auth");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify({
            email: email,
            password: password
        }));
    });
};