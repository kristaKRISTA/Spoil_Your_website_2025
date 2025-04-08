
(function($){
    var doc = $(document),
        _docBody = $(document.body),
        body = $('body');

    let getCompare = document.getElementById("compare");
    let getCompareWrapper = document.querySelector(".compare__wrapper");
    let getCompareBtn = document.querySelectorAll(".js-compare-btn");
    let getCompareListBtn =  document.getElementById("compare_list");
    let compareCounter = document.getElementById("compare__counter");

    let itemList = {};
    let itemArray = [];

    let createCompareItem = document.createElement("ul");
    createCompareItem.className = "createCompareItem";

    let getProductCompareLocalStorage = JSON.parse(localStorage.getItem("data-product-handle"));

    if(getProductCompareLocalStorage){
        getProductCompareLocalStorage = getProductCompareLocalStorage.split(",");

        itemArray = getProductCompareLocalStorage;
        if(itemArray.length > 1 ){
            getCompareListBtn.style.display = "flex";
        }

        compareCounter.innerHTML = `${itemArray.length}`;
    }


    _docBody.on('click', '.js-compare-btn', function(e) {
        e.preventDefault();

        let newArrayHandlelist = [];

        if(this.classList.contains("compareIn")){

            this.classList.remove("compareIn");

            let elHandle = this.getAttribute("data-product-handle");

            if(!localStorage.getItem("data-product-handle")){
                itemArray = [];
            }


            newArrayHandlelist = itemArray.filter(function(value){
                if(value !== elHandle){
                    return value;
                }
            });


            itemArray = newArrayHandlelist;

            itemArray = Array.from(new Set(itemArray));

            if(itemArray.length < 2 ){
                getCompareListBtn.style.display = "none";
            }

            if(itemArray.length > 6 ){
                $.fancybox.open({
                    content: `<div class="overInfo">You have added the maximum of products to compare. Please, remove some for adding new one.</div>`
                });
            }else {
                itemList = `${itemArray}`;
                localStorage.setItem("data-product-handle", JSON.stringify(itemList));
                compareCounter.innerHTML = `${itemArray.length}`;
            }


        }
        else {

            this.getAttribute("data-product-handle");

            if(!localStorage.getItem("data-product-handle")){
                itemArray = [];
            }

            itemArray.push(this.getAttribute("data-product-handle"));

            itemArray = Array.from(new Set(itemArray));

            if(itemArray.length > 6 ){
                $.fancybox.open({
                    content: `<div class="overInfo">You have added the maximum of products to compare. Please, remove some for adding new one.</div>`
                });

            }else {
                itemList = `${itemArray}`;

                localStorage.setItem("data-product-handle", JSON.stringify(itemList));
                this.classList.add("compareIn");
                compareCounter.innerHTML = `${itemArray.length}`;
            }


            let products = JSON.parse(localStorage.getItem("data-product-handle")).split(",");

            if( products.length > 1 ){
                getCompareListBtn.style.display = "flex";
            }

        }

        getCompare.addEventListener("click", function (el){
            if(el.target === el.currentTarget){
                getCompare.style.display = "none";
                if(itemArray.length < 2 ){
                    getCompareListBtn.style.display = "none";
                }
            }
        });

    });


    let getProductCompareLocalStorageId = JSON.parse(localStorage.getItem("data-product-handle"));

    if(getProductCompareLocalStorageId){
        let productshandleList = JSON.parse(localStorage.getItem("data-product-handle")).split(",");

        for(let i = 0; i < productshandleList.length;i++){

            for(let k = 0; k < getCompareBtn.length;k++){

                if(getCompareBtn[k].getAttribute("data-product-handle") === productshandleList[i]){
                    getCompareBtn[k].classList.add("compareIn");
                }
            }
        }
    }


    if(getCompareListBtn){

        getCompareListBtn.addEventListener("click",function (){
            getCompareWrapper.append(createCompareItem);

            createProduct();

            $(getCompare).fadeIn("slow");
            getCompare.style.display = "flex";
        });
    }

    function strip(html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;

        return tmp.textContent || tmp.innerText;

    }
    function createProduct(){
        createCompareItem.innerHTML = '';
        let products = JSON.parse(localStorage.getItem("data-product-handle")).split(",");
        let urls = [];

        for(let i = 0; i < products.length; i++){
            urls.push(`/collections/all/products/${products[i]}.js`);
        }

        $.fancybox.showLoading();
        Promise.all(urls.map(url=>fetch(url))).then(responses => Promise.all(responses.map(res => res.json()))).then(productData => {
            $.fancybox.hideLoading();

            !function(){e=function(){"use strict";window.innerShiv=function(){function n(e,t,r){return/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(r)?e:t+"></"+r+">"}var s,o=document,d="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");return function(e,t){if(!s&&((s=o.createElement("div")).innerHTML="<nav></nav>",1!==s.childNodes.length)){for(var r=o.createDocumentFragment(),a=d.length;a--;)r.createElement(d[a]);r.appendChild(s)}if(e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/(<([\w:]+)[^>]*?)\/>/g,n),s.innerHTML=(r=e.match(/^<(tbody|tr|td|col|colgroup|thead|tfoot)/i))?"<table>"+e+"</table>":e,r=r?s.getElementsByTagName(r[1])[0].parentNode:s,!1===t)return r.childNodes;a=o.createDocumentFragment();for(var i=r.childNodes.length;i--;)a.appendChild(r.firstChild);return a}}()},t={exports:{}},e.call(t.exports,t,t.exports),t.exports;var e,t;(function(){window.SPR=function(){function n(){}return n.shop=Shopify.shop,n.host="//productreviews.shopifycdn.com",n.version="v4",n.api_url=n.host+"/proxy/"+n.version,n.badgeEls=[],n.reviewEls=[],n.elSettings={},n.$=void 0,n.extraAjaxParams={shop:n.shop},n.registerCallbacks=function(){return this.$(document).bind("spr:badge:loaded","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onBadgeLoad:void 0),this.$(document).bind("spr:product:loaded","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onProductLoad:void 0),this.$(document).bind("spr:reviews:loaded","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onReviewsLoad:void 0),this.$(document).bind("spr:form:loaded","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onFormLoad:void 0),this.$(document).bind("spr:form:success","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onFormSuccess:void 0),this.$(document).bind("spr:form:failure","undefined"!=typeof SPRCallbacks&&null!==SPRCallbacks?SPRCallbacks.onFormFailure:void 0)},n.loadStylesheet=function(){var e;return(e=document.createElement("link")).setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href","https://productreviews.shopifycdn.com/assets/v4/spr-36ddd039ebeda1037e29d170fb1f249ad3ca8fef35f0fcfbe34accc286592f7d.css"),e.setAttribute("media","screen"),document.getElementsByTagName("head")[0].appendChild(e)},n.initRatingHandler=function(){return n.$(document).on("mouseover mouseout","form a.spr-icon-star",function(e){var t,r,a;return t=e.currentTarget,a=n.$(t).attr("data-value"),r=n.$(t).parent(),"mouseover"===e.type?(r.find("a.spr-icon:lt("+a+")").addClass("spr-icon-star-hover"),r.find("a.spr-icon:gt("+(a-1)+")").removeClass("spr-icon-star-hover")):r.find("a.spr-icon").removeClass("spr-icon-star-hover")})},n.initDomEls=function(){return this.badgeEls=this.$(".shopify-product-reviews-badge[data-id]"),this.reviewEls=this.$("#shopify-product-reviews[data-id]"),this.$.each(this.reviewEls,(a=this,function(e,t){var r;return r=a.$(t).attr("data-id"),a.elSettings[r]={},a.elSettings[r].reviews_el="#"+(a.$(t).attr("data-reviews-prefix")?a.$(t).attr("data-reviews-prefix"):"reviews_"),a.elSettings[r].form_el="#"+(a.$(t).attr("data-form-prefix")?a.$(t).attr("data-form-prefix"):"form_")}));var a},n.loadProducts=function(){return this.$.each(this.reviewEls,(i=this,function(e,t){var r,a;if(r=i.$(t).attr("data-id"),"false"!==i.$(t).attr("data-autoload"))return a=i.$.extend({product_id:r,version:i.version},i.extraAjaxParams),i.$.ajax({url:i.api_url+"/reviews/product",data:a,success:i.productCallback,dataType:"jsonp",jsonpCallback:"productCallback"+r})}));var i},n.loadBadges=function(){var e,t,r,a,i,n;if(0<(r=this.$.map(this.badgeEls,(n=this,function(e){return n.$(e).attr("data-id")}))).length){for(t=7,i=[];0<(e=r.splice(0,t)).length;)a=this.$.extend(this.extraAjaxParams,{product_ids:e}),i.push(this.$.ajax({url:this.api_url+"/reviews/badges",data:a,success:this.badgesCallback,dataType:"jsonp",jsonpCallback:"badgesCallback"+e.join("")}));return i}},n.pageReviews=function(e){var t,r,a;return a=this.$(e).data("product-id"),r=this.$(e).data("page"),t=this.$.extend({page:r,product_id:a},this.extraAjaxParams),this.$.ajax({url:this.api_url+"/reviews",data:t,success:this.paginateCallback,dataType:"jsonp",jsonpCallback:"paginateCallback"+a}),!1},n.submitForm=function(e){var t,r,a;return t=this.$(e).serializeObject(),t=this.$.extend(t,this.extraAjaxParams),t=(t=this.$.param(t)).replace(/%0D%0A/g,"%0A"),this.$.ajax({url:this.api_url+"/reviews/create",type:"GET",dataType:"jsonp",data:t,success:this.formCallback,beforeSend:(a=this,function(){return a.$(".spr-button-primary").attr("disabled","disabled")}),complete:(r=this,function(){return r.$(".spr-button-primary").removeAttr("disabled")})}),!1},n.reportReview=function(e){var t;return confirm("Are you sure you want to report this review as inappropriate?")&&(t=this.$.extend({id:e},this.extraAjaxParams),this.$.get(this.api_url+"/reviews/report",t,this.reportCallback,"jsonp")),!1},n.toggleReviews=function(e){return this.$("#shopify-product-reviews[data-id='"+e+"']").find(".spr-reviews").toggle()},n.toggleForm=function(e){return this.$("#shopify-product-reviews[data-id='"+e+"']").find(".spr-form").toggle()},n.setRating=function(e){var t,r,a;return t=this.$(e).parents("form"),a=this.$(e).attr("data-value"),r=this.$(e).parent(),t.find("input[name='review[rating]']").val(a),this.setStarRating(a,r)},n.setStarRating=function(e,t){return t.find("a:lt("+e+")").removeClass("spr-icon-star-empty spr-icon-star-hover"),t.find("a:gt("+(e-1)+")").removeClass("spr-icon-star-hover").addClass("spr-icon-star-empty")},n.badgesCallback=function(e){var r;return r=e.badges,n.$.map(n.badgeEls,function(e){var t;if(t=n.$(e).attr("data-id"),r[t]!==undefined)return n.$(e).replaceWith(r[t]),n.triggerEvent("spr:badge:loaded",{id:t})})},n.productCallback=function(e){var t;return t=e.remote_id.toString(),n.renderProduct(t,e.product_stripped,e.aggregate_rating),n.renderForm(t,e.form),n.renderReviews(t,e.reviews)},n.renderProduct=function(t,r,a){return this.$.map(this.reviewEls,(i=this,function(e){if(t===i.$(e).attr("data-id"))return i.$(e).html([innerShiv(r,!1),a]),i.triggerEvent("spr:product:loaded",{id:t})}));var i},n.renderForm=function(e,t){return this.$(this.elSettings[e].form_el+e).html(t),this.triggerEvent("spr:form:loaded",{id:e})},n.renderReviews=function(e,t){return n.$(n.elSettings[e].reviews_el+e).html(t),n.triggerEvent("spr:reviews:loaded",{id:e})},n.formCallback=function(e){var t,r,a,i;return i=e.status,a=e.remote_id,r=e.form,(t=n.$(n.elSettings[a].form_el+a)).html(r),"failure"===i&&n.initStarRating(t),"success"===i&&(n.$("#shopify-product-reviews[data-id='"+a+"'] .spr-summary-actions-newreview").hide(),n.$(".spr-form-message-success").focus()),n.triggerEvent("spr:form:"+i,{id:a})},n.initStarRating=function(e){var t,r,a;if((a=e.find("input[name='review[rating]']"))&&a.val())return r=a.val(),t=e.find(".spr-starrating"),this.setStarRating(r,t)},n.paginateCallback=function(e){var t,r;return r=e.remote_id.toString(),t=e.reviews,n.renderReviews(r,t)},n.reportCallback=function(e){var t;return t="#report_"+e.id,n.$(t).replaceWith("<span class='spr-review-reportreview'>"+n.$(t).attr("data-msg")+"</span>")},n.loadjQuery=function(e){return n.loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",function(){return n.$=jQuery.noConflict(!0),e()})},n.loadScript=function(e,t){var r;return(r=document.createElement("script")).type="text/javascript",r.readyState?r.onreadystatechange=function(){if("loaded"===r.readyState||"complete"===r.readyState)return r.onreadystatechange=null,t()}:r.onload=function(){return t()},r.src=e,document.getElementsByTagName("head")[0].appendChild(r)},n.loadjQueryExtentions=function(r){return r.fn.serializeObject=function(){var e,t;return e={},t=this.serializeArray(),r.each(t,function(){return e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e}},n.triggerEvent=function(e,t){return this.$(document).trigger(e,t)},n}(),SPR.loadStylesheet(),SPR.loadjQuery(function(){return SPR.$.ajaxSetup({cache:!0}),SPR.loadjQueryExtentions(SPR.$),SPR.$(document).ready(function(){return SPR.registerCallbacks(),SPR.initRatingHandler(),SPR.initDomEls(),SPR.loadProducts(),SPR.loadBadges()})})}).call(this)}("undefined"!=typeof global?global:"undefined"!=typeof window&&window);

            let productImage = '';
            let productAvailable = '';
            let productDescription = '';
            let productType = '';
            let productPrice = '';
            let productMoneyCurrency = '';
            let productOptionsSize = '';
            let productOptionsColor = '';
            let productOptionsType = '';
            let productOptionsVendor = '';
            let productOptionsRating = '';
            let productInfo = '';
            let productOptionBtn = '';
            let hideSizeElemByClass = '';
            let hideColorElemByClass = '';

            let productOptionsSizeArray = [];
            let productOptionsColorArray = [];
            let resultOpts = [];

            if (product.useCompareSize === false){
                hideSizeElemByClass = 'd-none';
            }
            if (product.useCompareColor === false) {
                hideColorElemByClass = 'd-none';
            }

            if(typeof theme.moneyFormat != 'undefined'){
                productMoneyCurrency = theme.moneyFormat.split('{')[0];
            }

            function dayCount(elem) {
                let day = new Date(elem);
                day.setDate(day.getDate() + parseInt(product.newProductsPeriod));
                return day;
            }


            for(let i = 0; i < productData.length; i++){


                var now = new Date();
                let newBadge = " ";
                if( now <= dayCount(productData[i].created_at)){
                    newBadge = `<span class="product_badge new">${theme.strings.compareNew}</span>`;
                }

                productOptionsSizeArray.push("-");
                productOptionsColorArray.push("-");

                if(productData[i].options){

                    let optsAll = productData[i].options;

                    if (product.useCompareSize === true && product.textCompareSize != ''){
                        optsAll = optsAll.filter(obj => {
                            let nameObj = obj.name.toLowerCase();
                            return nameObj !== product.textCompareSize;
                        });
                    }

                    if (product.useCompareColor === true && product.textCompareColor != ''){
                        optsAll = optsAll.filter(obj => {
                            let nameObj = obj.name.toLowerCase();
                            return nameObj !== product.textCompareColor;
                        });
                    }

                    resultOpts = optsAll.map(opt =>'<p class="mt-0 mb-1"><span class="opt-name">' + opt.name + '</span>' + ':' + '&nbsp;' + opt.values.join(', ') + '</p>').join(" ");


                    productData[i].options.forEach(function (item){
                        let optionName = item['name'].toLowerCase(),
                            optionValue = item['values'],
                            value = "";


                        if (Array.isArray(optionValue)) {
                            value = optionValue.join(', ');
                        } else {
                            value = optionValue;
                        }

                        if (optionName === `${product.textCompareSize}`) {

                            if (value == '' || value == 'Default Title') {
                                productOptionsSizeArray.splice(i, 1, '-');
                            } else {
                                productOptionsSizeArray.splice(i, 1, value);
                            }

                        } else if (optionName === `${product.textCompareColor}`) {
                            if (value == '' || value == 'Default Title') {
                                productOptionsColorArray.splice(i, 1, '-');
                            } else {
                                productOptionsColorArray.splice(i, 1, value);
                            }
                        }
                    });
                }

                if(resultOpts.length){
                    productOptionsType += `
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="itemOption_1">${resultOpts}</div>
                        </div>
                 `;
                } else {
                    productOptionsType += `
                         <div class="productContent" data-rem-handle="${productData[i].handle}">
                              <div class="itemOption_1">-</div>
                         </div>
                    `;
                }

                if(productOptionsSizeArray.length && product.useCompareSize === true ){

                    productOptionsSize += `
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="itemOption_1">${productOptionsSizeArray[i]}</div>
                    </div>`;
                }
                if(productOptionsColorArray.length && product.useCompareColor === true){
                        productOptionsColor += `
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="itemOption_1">${productOptionsColorArray[i]}</div>
                    </div> `;
                }

                let saleBadge = "";
                if(productData[i].price_varies){
                    saleBadge = `<span class="product_badge sale">${theme.strings.compareSale}</span>`;
                    productPrice = `<span class="product-price product-sale-price ">${productMoneyCurrency}${(productData[i].price_min/100).toFixed(2)}</span> <span class="product-regular-price">${productMoneyCurrency}${(productData[i].compare_at_price/100).toFixed(2)}</span>`;
                }else{
                    productPrice = `<span class="product-price">${productMoneyCurrency}${(productData[i].price/100).toFixed(2)}</span>`;
                }


                productImage += `
					<div class="productContent" data-rem-handle="${productData[i].handle}">
					<div class="compareRemoveItem" data-rem-handle="${productData[i].handle}">${theme.strings.compareRemove}</div>
						${saleBadge}
						${newBadge}
					 <img loading="lazy"  class="productImage" src="${productData[i].featured_image}" srcset="${productData[i].featured_image}" alt="${productData[i].title}">

					</div>

				`;

                productInfo += `<div class="productContent" data-rem-handle="${productData[i].handle}">
					<a href="${productData[i].url}"><h5 class="compareProductTitle">${productData[i].title}</h5></a>
				</div>
                `;


                let availableItem = '';
                if(productData[i].available === true){
                    availableItem = `<i style="color: #44bb9e;" class="fa fa-check" aria-hidden="true"></i>`;
                } else {
                    availableItem = `<i class="fa fa-times" aria-hidden="true"></i>`;
                }


                productAvailable += `
					<div class="productContent" data-rem-handle="${productData[i].handle}">
							<span class="description">${availableItem}</span>
					</div>

				`;

                productDescription += `
					<div class="productContent" data-rem-handle="${productData[i].handle}">
					<div class="description">${strip(productData[i].description)}</div>
					</div>

				`;

                productType += `
					<div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="description"><a href="/collections/types?q=${productData[i].type}"> ${productData[i].type}</a></div>
					</div>

				`;

                productOptionsVendor += `
					<div class="productContent" data-rem-handle="${productData[i].handle}">
					<div class="description"><a href="/collections/vendors?q=${productData[i].vendor}"> ${productData[i].vendor}</a></div>
					</div>

				`;

                productOptionsRating += `
				<div class="productContent" data-rem-handle="${productData[i].handle}">
                  <div class="description">
                    <span class="shopify-product-reviews-badge" data-id="${productData[i].id}"></span>
                  </div>
				</div>

				`;

                productOptionBtn += `
				<div class="productContent" data-rem-handle="${productData[i].handle}">
					<h4>${productPrice}</h4>
					<a class="btn btn-sm btn-primary compareBtn" href="${productData[i].url}">More details</a>
					</div>
				`;

            }


            createCompareItem.innerHTML += `
					<div class="itemWrapper">
						<li class="row">
								<span class="compare_item_option col-4">${theme.strings.compareImg}</span>
								<div class="infoWrapper px-0 col-8">
									<div class="itemImgWrap">
									${productImage}
									</div>
								</div>
							</li>

							<li class="row compare__row__title">
							<span class="compare_item_option col-4">${theme.strings.compareTitle}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
								${productInfo}
								</div>
							</div>
						</li>

						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareDetails}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
								${productOptionBtn}
								</div>
							</div>
						</li>


						<li class="row" id="compare__rating">
							<span class="compare_item_option col-4">${theme.strings.compareRating}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productOptionsRating}
								</div>

							</div>
						</li>


						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareAvailable}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
								${productAvailable}
								</div>
							</div>
						</li>

						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareVendor}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productOptionsVendor}
								</div>
							</div>
						</li>

						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareType}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productType}
								</div>
							</div>
						</li>

						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareDescription}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productDescription}
								</div>
							</div>
						</li>

						<li class="row ${hideSizeElemByClass}">
							<span class="compare_item_option col-4">${product.textCompareSize}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productOptionsSize}
								</div>
							</div>
						</li>


						<li class="row ${hideColorElemByClass}">
							<span class="compare_item_option col-4">${product.textCompareColor}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productOptionsColor}
								</div>
							</div>
						</li>

						<li class="row">
							<span class="compare_item_option col-4">${theme.strings.compareOptions}</span>
							<div class="infoWrapper px-0 col-8">
								<div class="itemImgWrap">
									${productOptionsType}
								</div>
							</div>
						</li>

					</div>
		`;

                _docBody.on('click', '.compareRemoveItem', function() {

                        let elHandle = this.getAttribute("data-rem-handle");

                        if(!localStorage.getItem("data-product-handle")){
                            itemArray = [];
                        }

                        let newArrayHandlelist = itemArray.filter(function(value){
                            if(value !== elHandle){
                                return value;
                            }
                        });


                        itemArray = newArrayHandlelist;

                        itemArray = Array.from(new Set(itemArray));

                        itemList = `${itemArray}`;

                        localStorage.setItem("data-product-handle", JSON.stringify(itemList));

                        let getCompareBtnArray = Array.from(document.querySelectorAll(".js-compare-btn"));


                        for(let i = 0; i < getCompareBtnArray.length; i++ ){

                            if(getCompareBtnArray[i].getAttribute("data-product-handle") === elHandle){
                                getCompareBtnArray[i].classList.remove("compareIn");
                            }

                        }

                        Array.from(document.querySelectorAll(`[data-rem-handle="${this.getAttribute("data-rem-handle")}"]`)).forEach(function(elem) {
                            elem.remove();
                        });

                        compareCounter.innerHTML = `${itemArray.length}`;

                });

        });

    }



    let getCompareClose = document.getElementById("compareClose");
    getCompareClose.addEventListener("click", function (){
        if(getCompare){
            $(getCompare).fadeOut("slow");
        }
        if(itemArray.length < 2 ){
            getCompareListBtn.style.display = "none";
        }
    });


    let compareClearAllBtn = document.getElementById("compareClearAll");
    compareClearAllBtn.addEventListener("click", function (){
        compareCounter.innerHTML = `0`;
        createCompareItem.innerHTML = '';
        localStorage.removeItem("data-product-handle");
        getCompareListBtn.style.display = "none";

        let getCompareBtnArray = Array.from(document.querySelectorAll(".js-compare-btn"));
        for(let i = 0; i < getCompareBtnArray.length; i++ ){
            getCompareBtnArray[i].classList.remove("compareIn");
        }

        $(getCompare).fadeOut("slow");
    });
})(jQuery);
