/* javascript */

// si on a besoin d'avoir du script jquery
// (sans doute pour pouvoir afficher ou masquer les légendes des images)
$(document).ready(function(){
	//console.log('ok');

	//alert('ok');

	// on cache tous les divs de #content
	$("#header #content>div").hide();
	$("#header #content>div.index").show();

	// quand on clique sur un élément du menu
	$("#header #menu li>a").click(function(event){

		// on sélectionne la classe de l'élément li parent
		var classe = $(this).parent().attr('class');

		// on masque tous les divs de #content
		$("#header #content>div").hide();
		// on affiche le div ayant la classe correspondante
		$("#header #content>div."+ classe).show();


		// on enlève la classe .active de tous les élémentsdu menu
		$("#header #menu li").removeClass('active');
		// on ajoute la classe .active à l'élément du menu sur lequel on a cliqué
		$("#header #menu li."+ classe).addClass('active');

		// on empêche le comportement par défaut du bouton
		event.preventDefault();
	});


	$(".index li").each(function(){
		$(this).click(function(event){
			//console.log('.item:eq('+($(this).index()+1)+')');

			$(".iconographie .item").removeClass('active');
			$(".iconographie .item .container").css('padding-left','50px');
			$(".iconographie .item .description").hide();

			$('.item:eq('+($(this).index())+')').addClass('active');
			$('.item:eq('+($(this).index())+')').find('.description').show();
			$('.item:eq('+($(this).index())+')').find('.container').css('padding-left','430px')

			var leftOffset = 75;
			if($(this).index() == 0){ leftOffset = 825; }

			$(".iconographie").scrollTo($('.item:eq('+($(this).index())+')'),800, {offset: {top:0, left:leftOffset} });
			$(".iconographie").css('z-index',3);
			$('#header').css('z-index',2);
		});
	});

	$ratio = 1.3;
	// AGRANDIR LES IMAGES
	$(window).resizeend({
		onDragEnd : function() {
			redim();
		},
		runOnStart : true
	});

	// MASQUER LES DESCRIPTIONS
	$(".iconographie .item .description").hide();


	$(".iconographie .item img:not(.bouton), .iconographie .item button").each(function(){
		$(this).click(function(event){
			$(".iconographie .item .container").css('padding-left','50px');
			$(".iconographie .item .description").hide();
			
			
			if(!$(this).parent().parent().parent().hasClass('active')){
				$(this).parent().parent().parent().addClass('active');
				$(this).parent().parent().find('.description').show();
				$(this).parent().parent().css('padding-left','430px');

				var leftOffset = 75;
				if($(this).parent().parent().parent().index() == 0){ leftOffset = 825; }

				$(".iconographie").scrollTo($('.item:eq('+($(this).parent().parent().parent().index())+')'),800, {offset: {top:0, left:leftOffset} });
			}else{
				$(".iconographie .item").removeClass('active');
			}
			

			event.preventDefault();
		});
	});


	// GERER LE z-index DU MENU ET DE L'ICONOGRAPHIE
	$(".iconographie").scroll(function(){

		if($(this).scrollLeft() > 0){
			$(".iconographie").css('z-index',3);
		}else{
			$(".iconographie").css('z-index',1);
		}
	});

	var onMenu = false;

	$(document).mousemove(function(event){
		if(event.pageY < 200 || onMenu){
			$('#header').css('z-index',4);
		}else{
			$('#header').css('z-index',2);
		}
	});

	$('#header').mouseover(function(){
		onMenu = true;
		$('#header').css('z-index',4);
	});

	$('#header').mouseout(function(){
		onMenu = false;
		$('#header').css('z-index',2);
	});

	$('.iconographie').mouseover(function(){
		//console.log('over iconographie');
		$("#header #menu li").removeClass('active');
		$("#header #content>div").hide();
	});


});

function redim(){

 	$ratio = ($('.iconographie').height())/(576+105+200);

	$(".iconographie img:not(.thumb)").each(function(){
		$(this).width( $(this).attr('width') *  $ratio );
		$(this).height( $(this).attr('height') *  $ratio );
	});
}