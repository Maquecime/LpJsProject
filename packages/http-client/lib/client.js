module.exports = function(host, port) {
        function findAll() {

        let url = `http://${host}:${port}`;

        return new Promise((resolve, reject) => {
            fetch(`${url}/api/rockets`)
                .then((response) => {
                    resolve(response.json());
                })
                .catch(reject)
        });
    }

    function add(object) {
        let url = `http://${host}:${port}`;
        return new Promise((resolve, reject) => {
            fetch(`${url}/api/rockets`, {
            method: "post",
            body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response.json());
            })
            .catch(reject)
        });
    }

    function findOne(id){
        let url = `http://${host}:${port}`;

        return new Promise((resolve,reject) => {
            fetch(`${url}/api/rockets/${id}`)
            .then((response) => {
                resolve(response.json());
            })
            .catch(reject)
        });
    }
    
    function update(id,object) {

        let url = `http://${host}:${port}`;


        return new Promise((resolve, reject) =>{
            fetch(`${url}/api/rockets/${id}`, {
                method:"put",
                headers: {"Content-Type": "application/json"}
                body:JSON.stringify(object)
            }) .then((response) =>{
                resolve(response.json());
            }).catch(reject)
        });
    }

    function deleteRocket(id) {

        let url = `http://${host}:${port}`;


        return new Promise((resolve, reject) =>{
            fetch(`${url}/api/rockets/${id}`, {
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
};