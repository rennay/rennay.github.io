$(e=>{
    $("#log_form").submit(e=>{
        e.preventDefault();
        window.location = "fbauthorize.html";
        return false;
    });
}); 