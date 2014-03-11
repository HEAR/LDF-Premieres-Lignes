/* javascript */

// si on a besoin d'avoir du script jquery
// (sans doute pour pouvoir afficher ou masquer les légendes des images)
$(document).ready(function(){
	console.log('ok');

	// on cache tous les divs de #content
	$("header #content>div").hide();

	// quand on clique sur un élément du menu
	$("header #menu li>a").click(function(event){

		// on sélectionne la classe de l'élément li parent
		var classe = $(this).parent().attr('class');

		// on masque tous les divs de #content
		$("header #content>div").hide();
		// on affiche le dic ayant la classe correspondante
		$("header #content>div."+ classe).show();


		// on enlève la classe .active de tous les élémentsdu menu
		$("header #menu li").removeClass('active');
		// on ajoute la classe .active à l'élément du menu sur lequel on a cliqué
		$("header #menu li."+ classe).addClass('active');

		// on empêche le comportement par défaut du bouton
		event.preventDefault();
	});

});