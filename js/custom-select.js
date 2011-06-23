function open_select(event) {
	var id = $(this).attr('data');
	var select = $("#"+id).get(0);
	var wrapper = $(".selector_expanded");
	var $table = $(".selector_expanded table");
	var table = $table.get(0);
	$table.attr('bound_select', id);
	
	var $label = $("label[for="+id+"]");
	$label.addClass('active');
	var off = $label.offset();
	wrapper.css('left', off.left + $label.width() + 16 + 'px');
	wrapper.css('top', off.top - 8 + 'px');
	for (var i = table.rows.length-1; i >= 0; i--) table.deleteRow(i);
	var opt_cnt = select.options.length;
	var sel_idx = select.selectedIndex;
	var row = null;
	var isNarrow = true;
	for (var i = 0; i < opt_cnt; i++) {
		var cidx = i % 4;
		if (!cidx) row = table.insertRow(i/4);
		var cell = row.insertCell(cidx);
		var option = select.options[i];
		if (option.innerHTML.length > 6) isNarrow = false;
		var $div = $("<div>", { 'class': "option", html: option.innerHTML, val: option.value });
		if (i == sel_idx) $div.addClass('active');
		$(cell).append($div);
	}
	if (isNarrow) $table.addClass('selector_narrow');
	wrapper.show();
	event.stopPropagation();
}

function close_select() {
	var wrapper = $(".selector_expanded");
	wrapper.hide();
	var table = wrapper.find("table");
	table.removeClass('selector_narrow');
	var id = table.attr('bound_select');
	$("label[for="+id+"]").removeClass('active');
}

$(".selector_expanded table").click(function(event){
	var id = $(this).attr('bound_select');
	var $target = $(event.target);
	if (!$target.hasClass("option")) return;
	$(id).value = $target.attr('val');
	$(".selector_expanded table .active").removeClass('active');
	$target.addClass('active');
	$(".pseudo-select[data="+id+"]").html($target.html());
	close_select();
});

$("select").each(function(idx, select){
	var lablels = $("label[for="+select.id+"]");
	if (!lablels.length) return;
	select.style.display = 'none';
	var subst =  $("<div>", {'class': "pseudo-select", html: select.options[select.selectedIndex].innerHTML }).attr('data', select.id);
	subst.click(open_select);
	$(select.parentNode).append(subst);
});

$(document).click(function(){
	close_select();
});