/**
 * Created by kikirizki on 7/10/16.
 */
$(document).ready(function () {
    var scroll_start = 0;
    $(document).scroll(
            function () {
                scroll_start = $(this).scrollTop();
                if (scroll_start > 0) {


                    $('.navbar-fixed-top').addClass('navbar-raised');

                }
                else {
                    $('.navbar-fixed-top').removeClass('navbar-raised');

                }

            }
        );


});