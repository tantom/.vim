for (var i = ary.length - 1; i >= 0; i--){

};

var a = "test";
$(document).ready(function() {

	// Closing brace correctly indented
	$("input").focus(function() {
		$(this).closest("li").addClass("cur-focus");
	}); // <-- I had to manually unindent this

	// Closing brace incorrectly indented
	$("input").blur(function() {
		$(this).closest("li").removeClass("cur-focus");
	}); // <-- This is what it does by default. Argh!

});
