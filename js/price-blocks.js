function update_price() {
	var val = this.value || this.val();
	var $parent = $(this).parents(".product-actions");
	var price = $parent.find("input[name=price]").val();
	var total = String(price * val);
	$parent.find(".price .value big").html(total.replace(/(.)(...)$/, "\$1 \$2"));
}

$(".amount-selector .inc-amount").click(function(event){
	var input = $(this).nextAll(".amount-number");
	var val = parseInt(input.val()) + 1;
	if (val > 99) val = 99;
	input.val(val);
	update_price.call(input);
	event.preventDefault();
});
$(".amount-selector .dec-amount").click(function(event){
	var input = $(this).next(".amount-number");
	var val = parseInt(input.val()) - 1;
	if (val < 1) val = 1;
	input.val(val);
	update_price.call(input);
	event.preventDefault();
});
$(".amount-selector .amount-number").change(update_price);
