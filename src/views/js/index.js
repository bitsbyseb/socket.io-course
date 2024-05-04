const socket = io({
    auth:{
        token:"mortarion"
    }
});

socket.on("connect_error",err => {
    console.log("connection error 😔❌");
    console.log(err.data.details);
    console.log(err.message);
});