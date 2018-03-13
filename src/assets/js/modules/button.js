/**
 * Our button module, accepting custom ajax actions
 */
module.exports.init = function(framework) {
    
    jQuery('.wpcf-button').click( function(event) {

        event.preventDefault();

        var action  = jQuery(this).data('action'),
            message = jQuery(this).data('message')
            self    = this;

        if( ! action ) {
            return;
        }

        jQuery.ajax({
            beforeSend: function() {
                jQuery(self).addClass('wpcf-loading');
            },
            complete: function() {
                jQuery(self).removeClass('wpcf-loading');

                setTimeout( function() {
                    jQuery(self).next('.wpcf-button-message').fadeOut();
                }, 3000);

                setTimeout( function() {
                    jQuery(self).next('.wpcf-button-message').remove();
                }, 3500);                

            },
            data: {
                action: action,
                nonce: wpcf.nonce
            },
            error: function(response) {
                if( wpcf.debug ) {
                    console.log(response);
                }
            },
            success: function(response) {

                if( wpcf.debug ) {
                    console.log(response);
                }
                
                if( message && typeof(response.data) !== 'undefined' ) {
                    jQuery(self).after('<div class="wpcf-button-message updated"><p>' + response.data + '</p></div>');
                }

            },
            type: 'POST',
            url: wpcf.ajaxUrl
        });

    });
    
}