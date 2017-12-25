$(function(){
    function hideOverlay(){
        setTimeout(function(){
            $('#overlay').hide();
        }, 300);
    }

    $('#humburguer').on('click', function(e){
        e.preventDefault();
        
        if($('#overlay').is(':visible')) {
            hideOverlay();
        } else {
            $('#overlay').show(0);
        }

        $('.navbar').toggleClass('active');
    });

    $('#overlay').click(function(){
        $('.navbar').removeClass('active');
        
        hideOverlay();
    });
});