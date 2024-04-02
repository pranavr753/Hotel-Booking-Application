$(".flash-msg-close").on("click", function(e){
    $(e.target).closest(".alert-dismissible").remove();
});