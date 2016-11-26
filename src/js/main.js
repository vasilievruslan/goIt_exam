//= tmpl.js
//= isotope.pkgd.min.js
'use strict';


$(document).ready(function() {
    jQuery.support.cors = true;
    // SLIDER
    $('.flexslider').flexslider({
        animation: "slide"
    });
    // Renderingimage for Isotop
    jQuery.ajaxSetup({
        xhr: function() {
            //return new window.XMLHttpRequest();
            try {
                if (window.ActiveXObject)
                    return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}

            return new window.XMLHttpRequest();
        }
    });


    function imgRender(img) {

        if (img === undefined) {
            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: 'http://api.pixplorer.co.uk/image?word=Holidays&amount=7&size=lg',
                success: function(data) {
                    //            console.log(data);
                    var html = tmpl($('#grid-template').html(), data);
                    $('.grid').remove();

                    $('.ideas').append(html);
                    // ISOTOP
                    $(window).resize(function() {
                        if ($(window).width() > 960) {
                            $('.grid').isotope({
                                itemSelector: '.grid-item',
                                masonry: {
                                    columnWidth: 20,
                                    gutter: 15
                                }
                            });
                        } else {
                            $('.grid').isotope({
                                itemSelector: '.grid-item',
                                masonry: {
                                    columnWidth: 240,
                                    gutter: 20
                                }
                            });
                        }
                    });

                }
            });
        } else $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: 'http://api.pixplorer.co.uk/image?word=' + img + '&amount=7&size=lg',
            success: function(data) {
                //   		    console.log(data);
                var html = tmpl($('#grid-template').html(), data);
                $('.grid').remove();

                $('.ideas').append(html);
                // ISOTOP
                $(window).resize(function() {
                    if ($(window).width() > 960) {
                        $('.grid').isotope({
                            itemSelector: '.grid-item',
                            masonry: {
                                columnWidth: 20,
                                gutter: 15
                            }
                        });
                    } else {
                        $('.grid').isotope({
                            itemSelector: '.grid-item',
                            masonry: {
                                columnWidth: 240,
                                gutter: 20
                            }
                        });
                    }
                });

            }
        });
    }
    // SEARCH
    $('.search').on('submit', submit);

    function submit(e) {
        var val = encodeURIComponent($('.interests').val());
        imgRender(val);
        e.preventDefault();
    }

    imgRender();

});
