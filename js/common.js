

// 1 MODAL WINDOW

// 1.1 data, time - peaker


// 2. formstyler js
// 3. show more

// 4. mmenu
// 5.slick slider
// 6. google-map



$(document).ready(function(){

// 1 MODAL WINDOW


    // $('.header-mobile').removeClass('hidden');
    var overlay ,
        modal,
        slideId,
        body = $('body'),
        modalTrigger = $('.js-modal');
    var slickIndex ;

    modalTrigger.on('click', function(e){
        e.preventDefault();
        modal = $(this).data('href');
        overlay = $(modal).parent();

        overlay.fadeIn(400, function(){
            $(modal).css('display', 'block').animate({
                top: '8%',
                opacity: 1
            }, 400);
            body.css({
                position: 'fixed',
                width: '100%',
                marginLeft: '-15px'
            });
        });

        if(modal == '#modalWindow__nomer'){
            slideId = $(this).data('slide');
            var modalSlider = $('.js-pop-slider');
            var triggerTexts  = function(){
                setTimeout( function(){
                    var prevSlideText = $('.js-pop-slider .slick-current').prev().find('.nomer__info h4:first-child').text();
                    var nextSlideText = $('.js-pop-slider .slick-current').next().find('.nomer__info h4:first-child').text();

                    $('.js-iterator .js-prev').text(prevSlideText);
                    $('.js-iterator .js-next').text(nextSlideText);
                }, 300);
            };

            $(document).on('orientationchange', function () {
                modalSlider.resize();
            });

            setTimeout( function(){
                modalSlider.resize();
                slickIndex = modalSlider.find('[data-artwork="' + slideId + '"]').data('slick-index');
                modalSlider.slick('slickPause').slick('slickGoTo', slickIndex);
                // triggerTexts();
            } , 400 );

            modalSlider.on('afterChange', function(event, slick, direction){
                triggerTexts();
            });

            $('.js-prev').on('click', function(e){
                modalSlider.slick('slickPrev');
            });
            $('.js-next').on('click', function(e){
                modalSlider.slick('slickNext');
            });
        }
    });


    /*********** fire modal from modal // checkout modal from card **************/

    $('.js-check').on('click', function(e){
        e.preventDefault();
        var curID = $(this).data('id');
        var curSliderTitle;
        if(e.target.parentNode.className == 'card' ){
            curSliderTitle = $(this).data('title');
        } else {
            curSliderTitle = $('.js-pop-slider .slick-current').find('.nomer__info h4:first-child').text();
        }

        $(modal)
            .animate({opacity: 0, top: '45%'}, 200,
                funcCloseModal()
            );

        var modal = $(this).data('href');
        var overlay = $(modal).parent();
        setTimeout(function () {
            overlay.fadeIn(400, function(){
                $(modal).css('display', 'block').animate({
                    top: '8%',
                    opacity: 1
                }, 400);
                body.css({
                    position: 'fixed',
                    width: '100%',
                    marginLeft: '-15px'
                });
            });

            $(modal).find('.modal__content > h4').text(curSliderTitle);
            $('#modalWindow').attr('data-id', curID);
        }, 400);
    });



    $(window).on('click', function(e){
        if(e.target.className == 'modal__overlay' ||
            e.target.className == 'closeModalIcon'){

            // $(modal)
            $('.modalDiv')
                .animate({opacity: 0, top: '45%'}, 200,
                    funcCloseModal()
                );
        }
    });

    //============  ESCAPE key pressed
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            // $(modal)
            $('.modalDiv')
                .animate({opacity: 0, top: '45%'}, 200,
                    funcCloseModal()
                );
        }
    });

    function funcCloseModal() {
        var that = $(this);
        // that.css('display', 'none');
        $('.modalDiv').css('display', 'none');
        // overlay.fadeOut(400);
        $('.modalDiv').parent().fadeOut(400);
        body.removeAttr('style');
        // body.css({
        //     position: 'relative',
        //     width: 'auto',
        //     marginLeft: '0'
        // });
        setTimeout(function () {
            $('.modalDiv').removeAttr('style');
        }, 400);
    }




// 1.1 data, time - peaker


        $( ".datepicker" ).datepicker();

        $('.clockpicker').clockpicker();


// // 2. formstyler js

    $('.js-styler').styler();


//3.2  show more
    (function(){

            var
                blocks = $('.show-more-block'),
                linkText = blocks.data('linktext'),
                linkText2 = blocks.data('linktext2');

            for(var i = 0; i < blocks.length; i++) {
                var
                    realHeight = blocks[i].clientHeight,
                    dataHeight = blocks[i].dataset.height;
                moreLink = document.createElement('span');
                moreLink.innerHTML = linkText;
                moreLink.dataset.height = realHeight;
                moreLink.className = 'show-more__link js-more-link';

                if(realHeight > dataHeight) {
                    blocks[i].after(moreLink);
                    blocks[i].style.height = dataHeight + 'px';
                    blocks[i].dataset.trigger = 1;
                }
            }

            $(document).on('click', '.js-more-link', function(){
                var realheight = $(this).data('height')

                if( $(this).prev().data('trigger') == 1) {
                    $(this).prev().animate({
                        height: realheight + 5
                    }, 500);
                    $(this).text(linkText2);
                    $(this).prev().data('trigger', 0);
                } else {
                    $(this).prev().animate({
                        height: dataHeight
                    }, 500);
                    $(this).text(linkText);
                    $(this).prev().data('trigger', 1);
                }
            });



    })();




// // 4. mmenu

    $('#my-menu').css('opacity', 1);
    $('#my-menu').mmenu({
        extensions: ['effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: 'title '
        },
        offCanvas: {
//                pageSelector: ".main-wrap",
            position: 'right'
        }
    });
//
    var apiButt = $('#my-menu').data('mmenu');
    apiButt.close($("#my-menu"));

    apiButt.bind('open:finish', function() {
        $('.hamburger').addClass('is-active');
    });
    apiButt.bind('close:finish', function() {
        $('.hamburger').removeClass('is-active');
    });

    $('#my-menu a[data-href="#map-block"]').on('click', function(){
        apiButt.close($("#my-menu"));
    });
//
//
//
//
// 5.slick slider

// **** next - prev buttons for sliders

    $('.js-prev').on('click', function(e){
        let slider = $(this).closest('section[data-rel=slider]').attr('class');
        $(`.js-${slider}`).slick('slickPrev');
    });
    $('.js-next').on('click', function(e){
        let slider = $(this).closest('section[data-rel=slider]').attr('class');
        $(`.js-${slider}`).slick('slickNext');
    });



    $('.js-slider_four').slick(getSliderFourSettings());
    $('.js-slider_best').slick(getSliderBestSettings());
    $('.js-slider_item').slick(getSliderUnoSettings());
    // $('.js-slider_nomer').slick(getSliderUnoSettings11());
    $('.js-slider_fw').slick(getSliderFWSettings());
    $('.js-slider_brands').slick(getSliderBrandsSettings());

    function getSliderBrandsSettings(){
        return {
            slidesToShow:6,
            slidesToScroll:3,
            arrows: false,
            dots: false,
            focusOnSelect:true,
            autoplay: false,
            responsive:[
                {
                    breakpoint: 770,
                    settings:{
                        swipe: false
                    }
                }
            ]
        }
    }
    function getSliderFWSettings(){
        return {
            slidesToShow:1,
            slidesToScroll:1,
            arrows: false,
            dots: false,
            focusOnSelect:true,
            autoplay: false
        }
    }

    function getSliderUnoSettings(){
        return {
            slidesToShow:1,
            slidesToScroll:1,
            arrows: true,
            dots: false,
            focusOnSelect:true,
            autoplay: false,
            swipe: false,
            responsive:[
                // {
                //     breakpoint: 770,
                //     settings:{
                //         swipe: true
                //     }
                // }
            ]
        }
    }

    function getSliderFourSettings(){
        return {
            slidesToShow:4,
            slidesToScroll:1,
            arrows: true,
            dots: false,
            focusOnSelect:true,
            autoplay: false,
            responsive:[
                {
                    breakpoint: 991,
                    settings:{
                        slidesToShow: 3,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 760,
                    settings:{
                        slidesToShow: 2,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 550,
                    settings:{
                        slidesToShow: 1,
                        slidesToScroll:1
                    }
                }

            ]
        }
    }
    function getSliderBestSettings(){
        return {
            slidesToShow:3,
            slidesToScroll:1,
            arrows: false,
            dots: false,
            focusOnSelect:true,
            autoplay: false,
            responsive:[
                {
                    breakpoint: 760,
                    settings:{
                        slidesToShow: 2,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 550,
                    settings:{
                        slidesToShow: 1,
                        slidesToScroll:1
                    }
                }

            ]
        }
    }



// 6. google-map
//
//     function initialize() {
//         var latlng = new google.maps.LatLng(46.966883, 32.008453);
//         var myOptions = {
//             zoom: 17,
//             center: latlng,
//             zoomControl: false,
//             streetViewControl: false,
//             scrollWheel:false,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         var map = new google.maps.Map(document.getElementById('map'),
//             myOptions);
//
//         setMarkers(map, places);
//     }
//
//     var places = [
//         ['sscl', 46.966883, 32.008453]
//     ];
//
//     function setMarkers(map, locations) {
//         var image = new google.maps.MarkerImage('img/icon-mark.png',
//             new google.maps.Size(64, 76),
//             new google.maps.Point(0, 0),
//             new google.maps.Point(23, 74));
//
//         for (var i = 0; i < places.length; i++) {
//             var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
//
//             var marker = new google.maps.Marker({
//                 position: myLatLng,
//                 map: map,
//                 icon: image,
//                 animation: google.maps.Animation.DROP,
//                 title: locations[i][0]
//             });
//         }
//     }
//     google.maps.event.addDomListener(window, 'load', initialize);







});



