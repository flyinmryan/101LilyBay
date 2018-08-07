$(document).ready(function function_name(argument) {
	todo.initList();
})

function compare(a,b) {
  if (a.subCategories.length > b.subCategories.length)
    return -1;
  if (a.subCategories.length < b.subCategories.length)
    return 1;
  return 0;
}

function scrollToPanel(ele, timeout) {
	setTimeout(function() {
	 	$('html, body').animate({
			scrollTop: ele.offset().top - 20
		});
	}, timeout);
}

var todo = {
	initList: function () {
		$("li.panel .panel-collapse").each(function(){
    	console.log($(this).children(".list-group").children(".list-group-item").length);//$(this).next().children().children(".list-group-item"));
	    })
	    var sortedList = todo.toDoList.sort(compare);
	    todo.toDoList.forEach(function (item) {
	    	var eleName = item.category.replace(/[^\w\s]/gi, '').split(" ").join("");
	    	var unknown = item.details;
	    	var numberOfDescendants = 0;
	    	numberOfDescendants += item.subCategories.length;
	    	item.subCategories.forEach(function(child){
	    		console.log(numberOfDescendants, child)
	    		numberOfDescendants += child.subCategories.length;
	    	})
	    	$("#accordion>.list-group")
	    		.append(
		    		$("<li>", {
		    			"class": "panel panel-default",
		    		}).append(
						$("<div>", {
							"class": "panel-heading " + item.status
						}).append(
							$("<h4>", {
								"class": "panel-title"
							}).append(
								$("<a>", {
									"data-toggle": "collapse",
									"data-parent": "#accordion",
									"href": "#collapse" + eleName,
									"id": eleName
									}).append(
										item.category
										).append(
											item.subCategories.length > 0 ?
											$("<span>", {
												"class": "badge badge-primary badge-pill",
												text: numberOfDescendants
											})
											: ""
										)
								)
							)	
						).append(
		    				$("<div>", {
		    			 		id: "collapse" + eleName,
		    			 		"class": "panel-collapse collapse"	
		    				})
		    			)
		    		)
		    		todo.addSubCats(item, "#collapse" + eleName);
	    	
	    });

	    $(".panel").each(function(){
	    	var headEle = $(this).closest(".panel").children(".panel-heading");
	    	console.log(headEle.hasClass("urgent"));
	    	if ((!$(this).hasClass("panel-primary") && !$(this).hasClass("instructions")) && !headEle.hasClass("complete") && !headEle.hasClass("urgent") && $(this).find(".list-group-item").length == 0) {
	    		
	    		headEle.addClass("inactive");
	    	}
	    })
	    $(".up-arrow").click(function () {
	    	console.log($(this).closest(".panel-collapse"));
	    	$(this).closest(".panel-collapse").attr("aria-expanded", "false").removeClass("in");
	    })
	    $(".panel-title a").click(function () {
	    	if (!$(this).closest(".panel-collapse").hasClass("collapsed")) {
	    		$(".in").attr("aria-expanded", "false").removeClass("in");
	    	}
	    	scrollToPanel($(this), 300);
	    })
	},
	addSubCats: function(item, parentEle){

	item.subCategories.forEach(function(cat){
		$(parentEle)
			.append(
				$("<li>", {
					id: cat.category.replace(/[^\w\s]/gi, '').split(" ").join(""),
					"class": "list-group-item d-flex justify-content-between align-items-center"
				})
				.append(
					$("<p>", {
						"class": "list-group-item-heading",
						text: cat.category + "     "
					})
					.append(
						cat.subCategories.length > 0 ?
						$("<span>", {
							"class": "badge badge-primary badge-pill",
							text: cat.subCategories.length
						})
						: ""
					)
				)
				.append(
					cat.details.length > 0 ?
					$("<p>", {
						"class": "details",
						text: cat.details
					})
					: ""
				).append(
					cat.subCategories.length == 0 && cat.link.length > 0 ? 
					$("<a>", {
						text: "more info",
						"href": "javascript:window.open('" + cat.link + "')",
						"class": "list-group-item d-flex justify-content-between align-items-center outside-link no-border"
					})
					: ""
				).append(
					cat.image.length > 0 ?
					$("<div>", {
						"class": "subCatImg"
					})
					.append(
						$("<a>", {
							"class": "list-group-item-text",
							"data-lightbox": "image",
							"href": (cat.image.indexOf("http") > -1 ? "" : "images/") + cat.image
						})
						.append(
							$("<img>", {
								"src": (cat.image.indexOf("http") > -1 ? "" : "images/") + cat.image
							})
						)
					)
					: ""
				)
				.append(
					cat.subCategories.length == 0 ?
						$("<div>", {
							"class": "up-arrow"
						})
					: ""
				)
			)
			if (cat.subCategories.length > 0) {
				$("#" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join("")).append(
					$("<div>", { 
						id: "subCatList-" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join(""),
						"class": "list-group list-group-subCat"
					})
				)
				$("#" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join("") + " .list-group-item-heading").css("cursor", "pointer")
				.click(function () {
					$("#subCatList-" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join("")).slideToggle();
				});
				$("#subCatList-" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join("")).hide();
				todo.addSubCats({ "subCategories": cat.subCategories, "category": "subCatList-" + cat.category }, "#subCatList-" + cat.category.replace(/[^\w\s]/gi, '').split(" ").join(""));
			}
		})
	},
	toDoList: [
		{
			category: "Barn style bathroom door",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
				{
					category: "Looks like a normal sliding doorway.",
					link: "https://preguntas.habitissimo.es/pregunta/si-quiero-ponerl-e-un-marco-como-en-la-foto-donde-la-puerta-se-deslizara-sin-necesidad-de-obra-es-factible-y-mas-barato-q-con-obra-supongo-no",
					image: "barndoor4.jpg",
					details: "",
					subCategories: []
				},
				{
					category: "Wardrobe for extra storage and a hidden door to bathroom.",
					link: "http://cavinitours.com/wardrobe-hidden-door/wardrobe-hidden-door-to-bathroom-flat-panel-doors-makes-joinery-disappear-sliding",
					image: "barndoor3.jpg",
					details: "",
					subCategories: []
				},
				{
					category: "",
					link: "https://www.pinterest.com/pin/200480620883803234/?lp=true",
					image: "barndoor.jpg",
					details: "",
					subCategories: []
				},
				{
					category: "",
					link: "https://www.pinterest.com/pin/494903446540462556/?lp=true",
					image: "barndoor2.jpg",
					details: "",
					subCategories: []
				}
			]
		},
		{
			category: "Backyard construction",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
				{
					category: "Pergola",
					link: "",
					image: "",
					details: "",
					subCategories: [
						{
							category: "Garden Arbor",
							link: "http://www.instructables.com/id/Garden-Arbor/?ALLSTEPS",
							image: "pergola1.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "The Giant Pergola",
							link: "http://www.hgtv.com/design/outdoor-design/landscaping-and-hardscaping/how-to-build-a-wood-pergola",
							image: "pergola2.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "A deck on top!?",
							link: "https://austinporchandpatio.com/tag/austin-second-story-deck-with-spiral-staircase/",
							image: "pergola8.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "Patio Pergola",
							link: "http://myoutdoorplans.com/pergola/patio-pergola-plans/",
							image: "pergola3.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "The Backyard Pergola",
							link: "http://www.popularmechanics.com/home/how-to-plans/how-to/a760/how-to-build-a-pergola-plans/",
							image: "pergola4.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "The Large Pergola",
							link: "http://www.howtospecialist.com/outdoor/pergola/large-pergola-plans/",
							image: "pergola5.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "The Vine Covered Pergola",
							link: "http://www.familyhandyman.com/garden-structures/how-to-build-a-pergola/view-all",
							image: "pergola6.jpg",
							details: "",
							subCategories: []
						},
						{
							category: "The Vine Covered Pergola",
							link: "http://www.diynetwork.com/how-to/outdoors/structures/how-to-build-a-pergola",
							image: "pergola7.jpg",
							details: "",
							subCategories: []
						}
					]
				},
				{
					category: "Pathway",
					link: "",
					image: "",
					details: "",
					subCategories: []
				},
				{
					category: "Pavers",
					link: "",
					image: "",
					details: "",
					subCategories: []
				},
				{
					category: "Flagstone",
					link: "",
					image: "",
					details: "",
					subCategories: []
				},
				{
					category: "Patterned stones",
					link: "",
					image: "",
					details: "",
					subCategories: []
				},
				{
					category: "Moulding",
					link: "",
					image: "",
					details: "",
					subCategories: []
				},
				{
					category: "Cobblestone",
					link: "",
					image: "",
					details: "",
					subCategories: []
				}
			]
		},
		{
			category: "Backyard furniture",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Backyard plants",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
				{
					category: "Fern Pine",
					link: "https://www.thespruce.com/growing-fern-pine-in-home-garden-3269272",
					image: "plant1.jpg",
					details: "Podocarpus. Try to create privacy wall along street, between sidewalk and fence.",
					subCategories: []
				},
				{
					category: "Autumn Blaze Maple",
					link: "https://www.fast-growing-trees.com/blog/autumn-blaze-maples-15-reasons-why-they-are-best/",
					image: "blaze.jpg",
					details: "Fast growing, not messy.",
					subCategories: []
				},
				{
					category: "Bowhall Maple",
					link: "https://supertrees.com/trees/maple-bowhall",
					image: "bowhall.jpg",
					details: "Seems to grow a little skinnier than other maples.",
					subCategories: []
				},
				{
					category: "Lavender Crate Myrtle",
					link: "",
					image: "cratemyrtle.jpg",
					details: "",
					subCategories: []
				},
				{
					category: "Bloodgood London - Japanese Maple",
					link: "https://www.bowerandbranch.com/t/164/bloodgood-london-planetreesycamore/",
					image: "bloodgood.jpg",
					details: "",
					subCategories: []
				},
				{
					category: "North Star Cherry",
					link: "https://www.fast-growing-trees.com/North-Star-Cherry.htm",
					image: "cherry.jpg",
					details: "Can buy fruit bearing for $60.",
					subCategories: []
				},


			]
		},
		{
			category: "Window coverings",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
				{
					category: "Top down, bottom up",
					link: "",
					image: "blackout.jpg",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Venetian blinds",
					link: "https://www.homestratosphere.com/types-blinds/",
					image: "venetian.png",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Plantation",
					link: "https://www.yelp.com/biz_photos/blinds-of-sacramento-citrus-heights-2?select=BRL1kztOdWvCGaV1ICOPdA",
					image: "plantation.jpg",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Panel",
					link: "",
					image: "panel.png",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Roman",
					link: "",
					image: "roman.png",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Solar",
					link: "",
					image: "solar.png",
					details: "",
		            status: "",
		            subCategories: []
				},
            ]
		},
		{
			category: "Kitchen table/chairs/stools",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
            	{
					category: "4 leafs",
					link: "https://colemanfurniture.com/toluca-chalk-and-cocoa-bean-132-extendable-rectangular-leg-dining-table.htm",
					image: "table.jpg",
					details: "Naturwood",
		            status: "",
		            subCategories: []
				},
				{
					category: "Only $639",
					link: "",
					image: "table639dollars.jpg",
					details: "",
		            status: "",
		            subCategories: []
				}
            ]
		},
		{
			category: "Couch/Sectional/Seats",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
            	{
					category: "Big fluffy plump comfortable couch",
					link: "http://www.jonathanlouis.net/collections/living-room/the-mathew-collection",
					image: "carlin.jpg",
					details: "",
		            status: "",
		            subCategories: []
				},
				{
					category: "Flexsteel Bryant",
					link: "http://www.flexsteel.com/product/bryant-7399-sect",
					image: "bryant.jpg",
					details: "",
		            status: "",
		            subCategories: []
				},
            ]
		},		
		{
			category: "Backsplash",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: [
				{
					category: "Aqua subway tile",
					link: "",
					image: "aqua-tile.png",
					details: "",
		            status: "",
		            subCategories: []
				},
            ]
		},
		{
			category: "Home owner insurance",
			link: "",
			image: "",
			details: "",
            status: "urgent",
            subCategories: []
		},
		{
			category: "Birthday invites",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Ask guys to help move",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "House cleaner 17 Sept",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Choose home insurance",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Car seat",
			link: "",
			image: "http://s7d2.scene7.com/is/image/Newellsync/86309",
			details: "Ordered, enroute.",
            status: "complete",
            subCategories: [
            	{
            		category: "Graco Extend2Fit",
					link: "",
					image: "https://images-na.ssl-images-amazon.com/images/I/91E1bp4zNtL._SX466_.jpg",
					details: "Ordered, enroute.",
		            status: "complete",
		            subCategories: []
            	}
            ]
		},
		{
			category: "Indoor paint",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Backsplash",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "USAA Home/Auto Insurance",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Washer/dryer",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Bed for Mason",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		},
		{
			category: "Dog door",
			link: "",
			image: "",
			details: "",
            status: "",
            subCategories: []
		}
	],
};