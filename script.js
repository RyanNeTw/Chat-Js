window.addEventListener("DOMContentLoaded",function(){

    let mail = document.querySelector(".mail")
    let password = document.querySelector(".password")
    let button = document.querySelector(".button")
    let message = document.querySelector(".message")
    let buttonS = document.querySelector(".buttonS")
    let list = document.querySelector(".list")
    let buttonD = document.querySelector(".buttonD")
    let span = document.querySelector(".span")

    if( localStorage.getItem("token") === null) {

        button.addEventListener("click",function(){
            connect()
            setTimeout(function(){
                receive()
                send()
                destroy()
            },3000)
        })
    }else{
        receive()
        send()
        destroy()
    }




    function destroy(){
        buttonD.style.display = "block"
        buttonD.addEventListener("click",function(){
            localStorage.removeItem('token');
            location.reload()
            return false
        })
    }

    function supprimer(id){
        
        fetch('https://api.edu.etherial.dev/apijsv2/messages/' + id,{  
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                
            },
        })
        setTimeout(() => { receive() }, 1000)
    }






    function receive(){
        mail.remove()
        password.remove()
        button.remove()
        message.style.display = "block"
        buttonS.style.display = "block"
        span.style.height = "0vh"
        
        let myInitMessagesReceive = {
            method:'GET',
            headers : {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        }
        fetch('https://api.edu.etherial.dev/apijsv2/messages', myInitMessagesReceive).then(function(response){
            response.json().then(function(json){
                    list.innerHTML=""
                    getMessage()
                    function getMessage(){
                        for (let i = 0; i < json["data"].length ; i++) {
                            let addText = document.createTextNode(json["data"][i]["nickname"] + " : " + json["data"][i]["message"])
                            let li = document.createElement("li")
                            li.appendChild(addText)
                            li.setAttribute("id", "message" + json["data"][i]["id"] )
                           
                            if(json["data"][i]["nickname"] === "ryan.ez-zerqti"){
                                let buttonD = document.createElement("button");
                                buttonD.innerHTML = "X";
                                li.appendChild(buttonD);
                                // buttonD.style.backgroundColor = "#001219"
                                // buttonD.style.border  = "1px solid white "
                                // buttonD.style.borderRadius = "50%"
                                // buttonD.style.color = "white"
                                // buttonD.style.cursor = "pointer"
                                let buttonM = document.createElement("button")
                                buttonM.innerHTML = "Modifie"
                                li.appendChild(buttonM)
                                document.querySelector(".list").appendChild(li).style.color="#e9d8a6"
                                document.querySelector(".list").appendChild(li).style.marginLeft="68vw"
                                document.querySelector(".list").appendChild(li).style.padding="20px 30px 20px 30px"
                                
                                buttonD.addEventListener("click", function(){
                                    supprimer(json["data"][i]["id"])
                                })
                                buttonM.addEventListener("click", function(){
                                    let input = document.createElement("input")
                                    input.type = "text"
                                    input.value = json["data"][i]["message"]
                                    let buttonModifie = document.createElement("button")
                                    buttonModifie.innerHTML = "confirm"
                                    li.replaceWith(input)
                                    input.appendChild(buttonModifie)
                                    input.addEventListener("keypress",function(e){
                                        if(e.key === 'Enter'){
                                            modifie(json["data"][i]["id"], input)
                                            setTimeout(() => { receive() }, 1000)
                                        }
                                    })
                                })
                            }else{
                                let buttonHideUser = document.createElement("button")
                                buttonHideUser.innerHTML = "Hide User"
                                buttonHideUser.value = json["data"][i]["nickname"]
                                li.appendChild(buttonHideUser)  
                                document.querySelector(".list").appendChild(li).style.color="#94d2bd"
                                document.querySelector(".list").appendChild(li).style.marginLeft="2vw"
                                document.querySelector(".list").appendChild(li).style.padding="20px 30px 20px 30px"
                                buttonHideUser.addEventListener("click",function(){
                                    json["data"].filter((user,index) =>{
                                        if(user["nickname"] == buttonHideUser.value){
                                            li.style.display = "none"
                                        }
                                    })
                                })
                            }
                            
                        }
                    }
            })

        })
    }

   




    setInterval(refresh,1000)
    function refresh(){
        let myInitMessagesReceive = {
            method:'GET',
            headers : {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        }

        fetch('https://api.edu.etherial.dev/apijsv2/messages', myInitMessagesReceive).then(function(response){
            response.json().then(function(json){
                for (let i = 0; i < json["data"].length  ; i++){
                    let messageId = document.querySelector("#message" + json["data"][i]["id"])
                    if(!messageId){
                        let addText = document.createTextNode(json["data"][i]["nickname"] + " : " + json["data"][i]["message"])
                        let li = document.createElement("li")
                        li.setAttribute("id", "message" + json["data"][i]["id"] )
                        li.appendChild(addText)
                        if(json["data"][i]["nickname"] === "ryan.ez-zerqti"){
                            list.appendChild(li).style.color="#e9d8a6"
                            document.querySelector(".list").appendChild(li).style.marginLeft="68vw"
                            document.querySelector(".list").appendChild(li).style.padding="20px 30px 20px 30px"
                            let buttonD = document.createElement("button");
                            buttonD.innerHTML = "Delete";
                            li.appendChild(buttonD);
                            let buttonM = document.createElement("button")
                            buttonM.innerHTML = "Modifie"
                            li.appendChild(buttonM)
                            buttonD.addEventListener("click", function(){
                                supprimer(json["data"][i]["id"])
                            })
                            buttonM.addEventListener("click", function(){
                                console.log("hello")
                                let input = document.createElement("input")
                                input.type = "text"
                                input.value = json["data"][i]["message"]
                                let buttonModifie = document.createElement("button")
                                buttonModifie.innerHTML = "confirm"
                                li.replaceWith(input)
                                input.appendChild(buttonModifie)
                                input.addEventListener("keypress",function(e){
                                    if(e.key === 'Enter'){
                                        modifie(json["data"][i]["id"], input)
                                        setTimeout(() => { receive() }, 1000)
                                        //receive()
                                    }
                                })
                            })
                        }else{
                            list.appendChild(li).style.color="#94d2bd"
                            document.querySelector(".list").appendChild(li).style.marginLeft="2vw"
                            document.querySelector(".list").appendChild(li).style.padding="20px 30px 20px 30px"
                            let buttonHideUser = document.createElement("button")
                                buttonHideUser.innerHTML = "Hide User"
                                buttonHideUser.value = json["data"][i]["nickname"]
                                li.appendChild(buttonHideUser)  
                                buttonHideUser.addEventListener("click",function(){
                                    json["data"].filter((user) =>{
                                        if(user["nickname"] == buttonHideUser.value){
                                            li.style.display = "none"
                                        }
                                    })
                                })
                            iziToast.show({
                                title: json["data"][i]["nickname"] + " :" ,
                                message: json["data"][i]["message"]
                            }); 
                        }
                        list.prepend("", li);
                    }
                }
            })
        })
    }


    function send(){
        buttonS.addEventListener("click",function(){
            let myInitMessageSend = {
                method:'POST',
                headers : {
                    'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Host': 'api.producthunt.com'
                },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify({ message: message.value}) 
            }
            fetch('https://api.edu.etherial.dev/apijsv2/messages',myInitMessageSend).then(function(response){
                response.json().then(function(json){
                    message.value=""
                })
            })
        })
    }




    function connect(){
        let myInit= {  method: 'POST',
        headers: {'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({email:mail.value, password: password.value}) 
        };
        fetch('https://api.edu.etherial.dev/apijsv2/auth',myInit).then(function(response){
            response.json().then(function(json){ 
                localStorage.setItem("token", json["data"]["token"])
            })
        })
    }


   


    function modifie(id, input){
        fetch('https://api.edu.etherial.dev/apijsv2/messages/' + id,{  
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({ message: input.value}) 
        })
    }




})