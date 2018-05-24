

// 1 MODAL WINDOW

// 1.1 data, time - peaker


// 2. formstyler js
// 3. show more

// 4. mmenu
// 5.slick slider
// 6. google-map



$(document).ready(function(){

// 1 MODAL WINDOW
    let __curModal ;
    $('.js-modal').on('click', function(e){
        __curModal = $(this).data('href');
        openModal(__curModal);
    });
    //============ Position on orientationchange and resize
    $(window).on("orientationchange resize", function() {
        if($('body').hasClass('modal_open')){
            setModalPosition(__curModal);
        }
    });
    //============ CLOSE on button */
    $(window).on('click', function(e){
        if(e.target.className == 'modal__overlay' || e.target.className == 'modal__close'){
            closeModal();
        }
    });
    //============  ESCAPE key pressed
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            closeModal();
        }
    });
    //============ Position function
    const setModalPosition = (id) => {
        let modal = $(id),
            position ;
        modal.stop();
        setTimeout(function(){
            if( modal[0].clientHeight > $(window).height() ){
                position = "TOP"
            } else {
                position = "CENTER"
            }
            modal.animate( getPosition(position), 400);
            function getPosition(position){
                if(position == "TOP") {
                    return {
                        top: '20px',
                        marginTop: 0,
                        opacity: 1
                    }
                } else {
                    return {
                        top: $(window).height() / 2 + 'px',
                        opacity: 1,
                        marginTop: '-' + modal[0].clientHeight / 2 + 'px'
                    }
                }
            }
        }, 200);
    };
    //============ OPEN function
    const openModal = (id) => {
        if( $(id)[0].parentElement.className != 'modal__overlay' ){
            $(id).wrap("<div class='modal__overlay'></div>");
        }
        if($('body').hasClass('modal_open')){
            closeModal();
        }
        setTimeout(function () {
            let overlay = $(id).parent();
            $(id).css('display', 'block');
            overlay.fadeIn(400, setModalPosition(id));
            $('body').addClass(`modal_open`);
        }, 300);
    };
    //============ CLOSE function
    let closeModal = () => {
        let modal = $('.modal__wrap');
        modal.animate({ opacity: 0, top: '45%'}, 200);
        modal.css('display', 'none');
        modal.parent('.modal__overlay').fadeOut(400);
        $('body').removeClass('modal_open');
        setTimeout(function () {
            modal.removeAttr('style');
        }, 250);
    }

// 1.1 data, time - peaker


        $( ".datepicker" ).datepicker();

        $('.clockpicker').clockpicker();


// // 2. formstyler js

    $('.js-styler').styler();

//  2.1 masked input
//     $('#input-payment-telephone').mask('+38 (999) 999 99 99');

//  2.2   jquery ui slider
    const MAXSliderValue = 130;
    $( "#delivery__slider" ).progressbar({
        // range: "min",
        value: 37,
        min: 1,
        max: MAXSliderValue
        // slide: function( event, ui ) {
        //     $( "#delivery__amount" ).val(MAXSliderValue - ui.value  + " грн");
        // }
    });
    $( "#delivery__amount" ).val( MAXSliderValue -  $( "#delivery__slider" ).attr( "aria-valuenow" ) + " грн");


//  2.22  jquery ui slider

    $( "#summ__slider" ).progressbar({
        // range: "min",
        value: 37,
        min: 1,
        max: MAXSliderValue
        // slide: function( event, ui ) {
        //     $( "#delivery__amount" ).val(MAXSliderValue - ui.value  + " грн");
        // }
    });
    $( "#summ__price" ).val( MAXSliderValue -  $( "#summ__slider" ).attr( "aria-valuenow" ) + " грн");


//  2.23  jquery ui slider

    $( "#summ__slider_min" ).progressbar({
        // range: "min",
        value: 37,
        min: 1,
        max: MAXSliderValue
        // slide: function( event, ui ) {
        //     $( "#delivery__amount" ).val(MAXSliderValue - ui.value  + " грн");
        // }
    });
    $( "#summ__price_min" ).val( MAXSliderValue -  $( "#summ__slider_min" ).attr( "aria-valuenow" ) + " грн");





// 3.1 show more in catalog
    const
        TEXTTOSHOW = 'Показать еще',
        TEXTTOHIDE = 'Скрыть';
    $('.js-nested').each(function(){
        let
            itemsToShow = 5,
            filterAmount = $(this).find('li').length;
        if( filterAmount > itemsToShow){
            $('li', this).eq(itemsToShow - 1).nextAll().hide().addClass('toggleable');
            $(this).after(`<div class="filter__show-more js-show"><span>${TEXTTOSHOW}</span></div>`);
        }
    });

    $('.js-show').on('click', function(){
        $(this).find('span').text() == TEXTTOHIDE ? $(this).find('span').text(TEXTTOSHOW) : $(this).find('span').text(TEXTTOHIDE);
        $(this).prev().find('li.toggleable').slideToggle();
    });

//
// <ul class=" js-nest">
//     <li></li>
//     <li></li>
// </ul>





//3.2  show more ****************
    var
        blocks = $('.js-show-more'),
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
        var realheight = $(this).data('height'),
            parent = $(this).prev();
        if( parent.data('trigger') == 1) {
            parent.animate({
                height: realheight
            }, 500);
            $(this).text(linkText2);
            parent.data('trigger', 0);
            parent.addClass('open');
        } else {
            parent.animate({
                height: dataHeight
            }, 500);
            $(this).text(linkText);
            parent.data('trigger', 1);
            parent.removeClass('open');
        }
    });



// 4.1 mmenu

    $('#my-menu').css('opacity', 1);
    $('#my-menu').mmenu({
        extensions: ['effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: 'BOND '
        },
        offCanvas: {
//                pageSelector: ".main-wrap",
            position: 'left'
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

    // $('#my-menu a[data-href="#map-block"]').on('click', function(){
    //     apiButt.close($("#my-menu"));
    // });


// 4.2 mmenu cart

    $('#my-cart').css('opacity', 1);
    $('#my-cart').mmenu({
        extensions: ['effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: 'Ваша корзина '
        },
        offCanvas: {
//                pageSelector: ".main-wrap",
            position: 'right'
        }
    });
//
    var apiButt = $('#my-cart').data('mmenu');
    apiButt.close($("#my-cart"));

    apiButt.bind('open:finish', function() {
        $('.hamburger.two').addClass('is-active');
    });
    apiButt.bind('close:finish', function() {
        $('.hamburger.two').removeClass('is-active');
    });

    // $('#my-cart a[data-href="#map-block"]').on('click', function(){
    //     apiButt.close($("#my-cart"));
    // });


// 4.2 END ***********


//
// 5.slick slider

// **** next - prev buttons for sliders

    $('.js-prev').on('click', function(e){
        $(this).closest('section[data-rel=slider]').find('.slider').slick('slickPrev');
    });

    $('.js-next').on('click', function(e){
        $(this).closest('section[data-rel=slider]').find('.slider').slick('slickNext');
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
                    breakpoint: 1100,
                    settings:{
                        slidesToShow: 5,
                        slidesToScroll:3,
                        swipe: false
                    }
                },
                {
                    breakpoint: 990,
                    settings:{
                        slidesToShow:4,
                        slidesToScroll:3,
                        swipe: false
                    }
                },
                {
                    breakpoint: 700,
                    settings:{
                        slidesToShow:3,
                        slidesToScroll:3,
                        swipe: false
                    }
                },
                {
                    breakpoint: 550,
                    settings:{
                        slidesToShow:2,
                        slidesToScroll:2,
                        swipe: false
                    }
                },
                {
                    breakpoint: 400,
                    settings:{
                        slidesToShow:1,
                        slidesToScroll:1,
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
            arrows: false,
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
            arrows: false,
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
                    breakpoint: 1100,
                    settings:{
                        slidesToShow: 3,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 900,
                    settings:{
                        slidesToShow: 3,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 768,
                    settings:{
                        slidesToShow: 2,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint: 576,
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



//  dropdown menu

    $('.js-menu__links').on('click','a', function(e){
        e.preventDefault();
        let id = e.target.attributes['data-href'].value;

        $(this).parent().addClass("active").siblings().removeClass('active');
        $(`#${id}`).closest('.menu__content').addClass('active');
        $(`#${id}`).addClass('active').siblings().removeClass('active');
        $('.js-drop__overlay').show();

    });

    $('.js-link-wrapper a').on('mouseover', function (e) {
        e.preventDefault();
        let id = e.target.attributes['data-link'].value;
        $('.js-link-wrapper').next().find(`img[data-id=${id}]`).addClass('active').siblings().removeClass('active')
    });

    $('.js-drop__overlay').on('click', function () {
        $('.js-drop__overlay').hide();
        $('.menu__content').removeClass('active');
    });







//============ Show form search
    $('.js_open-form').on('click', function () {

        $(this).prev().toggleClass('width_fx');
        $(this).toggleClass('btn_search-open');

        if($('.hidden_search').hasClass('width_fx')){
            setTimeout( () => {
                $(this).parent().find('.js_open-answer').addClass('height_fx')
            }, 1000)
        }else{
            $(this).parent().find('.js_open-answer').removeClass('height_fx')
        }
    });
// ======================== END Show form search


    $('.cart__desktop .js-desk').on('click', function(){
        $('.js-minicart').toggleClass('active');
    });


//remove href for last link in breadcrambs
    if($('.js-breadcrumbs a').length > 1 ) {
        $('.js-breadcrumbs a:last-child').attr('href', '#');
        $('.js-breadcrumbs a:last-child').on('click', function (e) {
            e.preventDefault();
        })
    }





//============  TABS
	$('.js_tabs-menu').on('click', 'li:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.js_tabs').find('.js_tabs-item').removeClass('active').eq($(this).index()).addClass('active');
	});
//========================  END TABS








});



