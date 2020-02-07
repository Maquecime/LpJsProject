module.exports = function(host, port) {
    
    function findAll() {
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/rockets`)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    function add(object) {
        console.log(JSON.stringify(object));
        return new Promise((resolve, reject) => {
            fetch(`http://${host}:${port}/api/rockets`, {
            method: "post",
            body: JSON.stringify(object)
            }).then((response) => {
                resolve(response.json());
            })
            .catch(reject)
        });
    }

    function findOne(id){
        return new Promise((resolve,reject) => {
            fetch(`http://${host}:${port}/api/rockets/${id}`)
            .then((response) => {
                resolve(response.json());
            })
            .catch(reject)
        });
    }
    
    function update(id,object) {
        return new Promise((resolve, reject) =>{
            fetch(`http://${host}:${port}/api/rockets/${id}`, {
                method:"put",
                body:object
            }) .then((response) =>{
                resolve(response.json());
            }).catch(reject)
        });
    }

    function deleteRocket(id) {
        return new Promise((resolve, reject) =>{
            fetch(`http://${host}:${port}/api/rockets/${id}`, {
                method: "delete"
            }).then((response) =>{
                resolve(response.json());
            }).catch(reject);
        });
    }

    return {
        findAll: findAll,
        add: add,
        findOne: findOne,
        updateRocket: update,
        deleteRocket: deleteRocket
    }
}