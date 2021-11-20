/*!
* VERSION: T4 0.0.2.1
* DATE: 19-10-2021
*
* (c) Copyright Flashtalking CGN - Germany. All rights reserved.
* It is illegal to modify, disassemble, sell, copy or publish this software
* or any part thereof. The use of this software is only permitted with the
* prior and express written permission of Flashtalking CGN - Germany.
* More information: http://www.flashtalking.com/
* 
* @author: Jan Weinen, jan@flashtalking.com
*/
var ad = ad || {};
(function(window, document, undefined){
	ad = {
		// local mode ([%PATH%] macro gets replaced with cdn assets path)
		local: false,
		// display debug messages in console
		debugging: true,
		debug: function(msg){
			if(ad.debugging){
				console.log(msg);
			}
		},
		// particle setup
		particleCount: 0,
		emitterPos: {top: -300, left: -300},
		animatedBG: false,
		// startframe
		currentFrame: 1,
		// TimelineMax setup
		timeline: new TimelineMax({paused: true, onRepeat: function(){
			ad.debug("Timeline: Repeat");
			//
			ad.timeline.add("timelinerepeat");
			// reset background-color element opacity
			TweenMax.set("#background-color", {opacity: 0});
			if(ad.video !== undefined){
				ad.video.play();
			}
			// reset bg content
			if(myFT.instantAds.backgroundContentType === "image-animated"){
				document.querySelector("#background-image").style.marginTop = -(document.querySelector("#background-image").naturalHeight - myFT.placementProperties.currentHeight) + "px";
				//ad.addBackgroundContent(myFT.instantAds.backgroundContentType);
			}
			ad.currentFrame = 1;
		}}),
		// video state helpers
		video: undefined,
		ended: false,
		videoPlaying: false,
		buildready: false,
		start: function(){
			// set repeat parameter to dynamic ad value
			ad.timeline.repeat(parseInt(myFT.instantAds.cycles, 10));
			// add custom CSS
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = myFT.instantAds.custom_CSS;
			document.getElementsByTagName("head")[0].appendChild(style);
			// add custom font
			var customFont = document.createElement("link");
			customFont.rel = "stylesheet";
			customFont.type = "text/css";
			customFont.href = myFT.instantAds.custom_Font;
			document.getElementsByTagName("head")[0].appendChild(customFont);
			// add logo
			document.querySelector("#logo").src = myFT.instantAds.logo;
			// set mask gradient
			document.querySelector("#mask-gradient").style.background = myFT.instantAds.maskGradient;
			// create the background content
			//myFT.instantAds.backgroundContentType === "video" ? ad.addBackgroundContent("video") : ad.addBackgroundContent("image");
			ad.addBackgroundContent(myFT.instantAds.backgroundContentType);
			// set background gradient
			document.querySelector("#background-color").style.background = myFT.instantAds.backgroundColorGradient;
			// create the frames and copylines based on the manifest data
			ad.addCastle(myFT.getManifest("width") + "x" + myFT.getManifest("height"));
			// create video or image as background
			ad.addCopyLines(myFT.getManifest("instantAds"));
			// add legal text
			ad.addHTML("#conditions--", myFT.instantAds.conditions);
			// add copyright text
			ad.addHTML("#copyright--", myFT.instantAds.copyright);
			// add custom HTML
			ad.addHTML("#custom-frame-item--", myFT.instantAds.custom_HTML);
			// add countdown
			if(myFT.instantAds.countdown !== ""){
				ad.addCountdown(myFT.instantAds.countdown);
			}
			// add hashtag (deprecated)
			document.querySelector("ft-default").insertAdjacentHTML("afterbegin", myFT.instantAds.hashtag);
			// check for visibility and control video playback
			ad.vis(function () {
				// if video is set and video is playing (assuming when timeline is paused that video is playing, therefore we can also use this when video is paused)
				// and ad timeline has not ended and ad is visible
				if (ad.video != undefined && ad.videoPlaying && !ad.ended && ad.vis()) {
					ad.debug("Video: Play");
					ad.video.play();
				} else if (ad.video != undefined && ad.videoPlaying && !ad.ended && !ad.vis()) {
					ad.debug("Video: Paused, waiting for visibility.");
					ad.video.pause();
				}
			});
		},
		// add custom or regular HTML
		addHTML: function(type, dynamicVariable){
			if(dynamicVariable !== ""){
				var elements = dynamicVariable.split("+++");
				for (var key in elements) {
					// when custom or regular HTML is being added via this function search for --…--, containing the frame it should appear, --all-- => wildcard for all frames
					var regex = /\--(.*?)\--/;
					var strToMatch = elements[key];
					var matched = regex.exec(strToMatch)[1];
					document.querySelector("ft-default").insertAdjacentHTML("beforeend", elements[key]);
					if(matched === "all"){
						ad.timeline.to(type + "all" + "--", 0.5, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power3.easeInOut}, "frame_0_in-=1");
						ad.timeline.to(type + "all" + "--", 0.5, {opacity: 0, ease: Power3.easeInOut}, "timelinerepeat");
					}else{
						ad.timeline.to(type + matched + "--", 0.5, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power3.easeInOut}, "frame_" + matched + "_in+=0.25");
						ad.timeline.to(type + matched + "--", 0.5, {opacity: 0, ease: Power3.easeInOut}, "frame_" + matched + "_out-=0.75");
					}
					
				}
			}
		},
		addCastle: function(size){
			// inject SVG element
			document.body.insertAdjacentHTML("afterbegin", castles["svg_" + size]);
			// and add it to the timeline
			ad.timeline.to("#castle__small", 3, {morphSVG: "#castle__big", ease: Power4.easeInOut, onUpdate: ad.redrawClipPath}, "castle");
		},
		redrawClipPath: function() {
			document.querySelector("#background-content").style.clipPath = "none";
			document.querySelector("#background-content").offsetWidth; //force a style recalculation
			document.querySelector("#background-content").style.clipPath = "url(#castle)";
		},
		addBackgroundContent: function(type){
			// apply video or image as background content based on instant ad variable
			switch (type){
				case "video":
					ad.video = new FTVideoElement();
					ad.video.autoplay = false;
					ad.video.loop = false;
					ad.video.controls = false;
					ad.video.name = "video1";
					ad.video.clickTag = 1;
					ad.video.muted = true;
					document.querySelector("#background-video").appendChild(ad.video);
					// add canplaythrough event to trigger timeline and video start
					ad.video.addEventListener("canplaythrough", function(){
						myFT.dispatchEvent("backgroundcontentloaded");
						ad.video.play();
						ad.videoPlaying = true;
					});
					// add video ended event
					ad.video.addEventListener("ended", function(){
						ad.debug("Video: End");
						// on video end resume the timeline
						ad.timeline.play();
						ad.videoPlaying = false;
						ad.debug("Timeline: Resume");
					});
					break;
				case "image":
					document.querySelector("#background-image").src = myFT.instantAds.backgroundImage;
					document.querySelector("#background-image").onload = function(){
						myFT.dispatchEvent("backgroundcontentloaded");
					};	
					break;
				case "image-animated":
					ad.animatedBG = true;
					document.querySelector("#background-image").src = myFT.instantAds.backgroundImage;
					document.querySelector("#background-image").onload = function(){
						document.querySelector("#background-image").style.marginTop = -(document.querySelector("#background-image").naturalHeight - myFT.placementProperties.currentHeight) + "px";
						myFT.dispatchEvent("backgroundcontentloaded");
					};		
					break;
			}
		},
		addCountdown: function(pit){
			var x = setInterval(function(){
				// set the date we're counting down to
				var countDownDate = new Date(pit).getTime();
				// get todays date and time
				var now = new Date().getTime();
				// find the distance between now and the count down date
				var distance = countDownDate - now;
				// time calculations for days, hours, minutes and seconds
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				// add a zero when there is only one digit
				days = days < 10 ? "0" + days : days;
				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				// apply value to their containers
				if(document.querySelector("#days")){
					document.querySelector("#days").innerText = days;
					document.querySelector("#hours").innerText = hours;
					document.querySelector("#minutes").innerText = minutes;
				}
				// when countdown expires
				if (distance < 0) {
					//document.getElementById("demo").innerHTML = "EXPIRED";
				}
			}, 1000);
		},
		particleAnimation: function(frame){
			// starting with frame 2 because frame 1 has a separate synced animation
			if(frame === 2){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"150%", top:"45%"}, {left:"-20%", top:"40%"}, {left:"30%", top:"53%"}, {left:"160%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1.4");
			} else if(frame === 3){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"-120%", top:"42%"}, {left:"30%", top:"70%"}, {left:"70%", top:"40%"}, {left:"150%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1");
			} else if(frame === 4){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"150%", top:"45%"}, {left:"-20%", top:"40%"}, {left:"30%", top:"53%"}, {left:"160%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1.4");
			} else if(frame === 5){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"-120%", top:"42%"}, {left:"30%", top:"70%"}, {left:"70%", top:"40%"}, {left:"150%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1");
			} else if(frame === 6){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"150%", top:"45%"}, {left:"-20%", top:"40%"}, {left:"30%", top:"53%"}, {left:"160%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1.4");
			} else if(frame === 7){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"-120%", top:"42%"}, {left:"30%", top:"70%"}, {left:"70%", top:"40%"}, {left:"150%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1");
			} else if(frame === 8){
				TweenMax.to("#particle-emitter", 3.2, {bezier:[{left:"150%", top:"45%"}, {left:"-20%", top:"40%"}, {left:"30%", top:"53%"}, {left:"160%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast},"-=1.4");
			}
		},
		emitParticles: function(){
			ad.particleCount++;
			var emitter = document.querySelector("#particle-emitter")
			var stage = document.querySelector("#particle-stage")
			var pElement = document.createElement("div");

			pElement.id = "particle" + ad.particleCount;
			pElement.innerHTML = '<img src="resources/images/particle.png" style="position: absolute; transform:scale(0.1); transform-origin: center; top: '+(ad.emitterPos.top)+'px; left: '+(ad.emitterPos.left)+'px; z-index: 500; opacity: '+(Math.random()*1+0.5)+'" />';

			ad.emitterPos = {
				top: emitter.style.top.replace("%", "")/100 * myFT.getManifest("height"),
				left: emitter.style.left.replace("%", "")/100 * myFT.getManifest("width")
			};
			stage.appendChild(pElement);
			var tween = TweenMax.to("#particle" + ad.particleCount + " img", 1.7, {x: Math.random()*100-75, y: Math.random()*80-40, scale: 0.4, rotation: Math.random()*180, ease:Cubic.easeOut, opacity: 0, onComplete: function(){
				tween.kill();
				stage.removeChild(pElement);
			}});
		},
		particleBlast: function(){
			ad.emitParticles();
			ad.emitParticles();
			ad.emitParticles();
		},
		addCopyLines: function(instantAdVariables){
			// get durations from instant ad variables and split them into array to cycle through
			var frameDurations = myFT.instantAds.durations.split(",");
			// get top offsets rom instant ad variables and split them into array to cycle through
			var frameContainerMargins = myFT.instantAds.containerMargins.split(";");
			// get the number of cycles from instant ad variables
			var cycles = parseInt(myFT.instantAds.cycles, 10);
			// frame-item-- generator loop
			for (var key in instantAdVariables) {
				if(instantAdVariables[key].name.indexOf("frame") === 0 && myFT.instantAds["frame" + (key) + "_text"] !== ""){
					// create ad div for each frame that has content
					var div = document.createElement("div");
					// set id with key value as unique identifier
					div.id = "frame-item--" + key;
					// set class
					div.className = "frame-item";
					// set top offset
					div.style.margin = frameContainerMargins[key];
					// replace [%PATH%] macro with actual path to CDN
					if(myFT.instantAds["frame" + (key) + "_text"].indexOf("[%PATH%]") > -1){
						if(ad.local){
							myFT.instantAds["frame" + (key) + "_text"] = myFT.instantAds["frame" + (key) + "_text"].replace("[%PATH%]", "resources/images");
						}else{
							myFT.instantAds["frame" + (key) + "_text"] = myFT.instantAds["frame" + (key) + "_text"].replace("[%PATH%]", "https://cdn.flashtalking.com/" + myFT.placementProperties.cID + "/instantAssets");
						}
					}
					// fill it with according text from dynamic ad variable
					div.innerHTML = myFT.instantAds["frame" + (key) + "_text"];
					// apply them to the frame-container element
					document.querySelector("#frame-container").appendChild(div);
					// applying the tweens to all childnodes of each frame
					// key == 0 is initial frame
					if(key == 0){
						ad.timeline.call(function(){
							if(myFT.instantAds.backgroundContentType === "video"){
								myFT.dispatchEvent("timelinepaused");
							}
						});
						// add label to identify frame later
						ad.timeline.add("frame_" + key + "_in");
						// // stagger all childnodes in | in sync with castle animation
						if(myFT.instantAds["frame" + (key) + "_text"].indexOf("synced") > -1){
							ad.timeline.staggerTo(document.querySelector("#frame-item--" + key).childNodes, 3, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power3.easeInOut}, 0.10, "castle");
						}else{
							ad.timeline.staggerTo(document.querySelector("#frame-item--" + key).childNodes, 0.75, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power3.easeInOut}, 0.10, "frame_0_in-=1.25");
						}
						// initial particle animation tween
						if(myFT.instantAds.particles === "true"){
							ad.timeline.to("#particle-emitter", 3.2, {bezier:[{left:"-120%", top:"42%"}, {left:"30%", top:"70%"}, {left:"70%", top:"40%"}, {left:"150%", top:"37%"}], ease:Power2.easeOut, onUpdate: ad.particleBlast}, "castle", "-=1");
						}
						// at frame function
						ad.timeline.call(function(){
							ad.debug("Frame: " + ad.currentFrame + "/" + document.querySelector("#frame-container").childNodes.length + " | " + "Cycle: " + ad.timeline._cycle);
						});
						//
						ad.timeline.staggerTo(document.querySelector("#frame-item--" + key).childNodes, 0.75, {opacity: 0, ease: Power3.easeInOut, delay: frameDurations[key]}, 0.10);
						// after frame function
						ad.timeline.add("frame_" + key + "_out");
						// stagger all childnodes out
						ad.timeline.call(function(){
							// if background content is set to video then pause the timline until video ended event
							if(ad.animatedBG){
								ad.timeline.pause();
								console.log("Timeline: Paused, waiting for animatedBG");
								TweenMax.to("#background-image", 1, {marginTop: "0", ease: Power2.easeInOut, onComplete: function(){
									ad.timeline.play();
									console.log("Timeline: Resumed, animatedBG finished");
								}});
							}
							// increase frame counter
							ad.currentFrame += 1;
						});
					// key > 0 are other frames
					} else{
						// fade in the background-color element
						ad.timeline.to("#background-color", 0.3, {opacity: 1, ease: Power3.easeInOut}, "-=0.75");
						// before frame function
						ad.timeline.call(function(){
							// if an image is set in the copylines | (ad.currentFrame - 1) because we are counting from 0 for the frame-item-- ids
							if(myFT.instantAds["frame" + (ad.currentFrame - 1) + "_text"].indexOf("hide-logo") >= 0){
								// fade out the DLP logo before frame starts
								TweenMax.to("#logo", 0.3, {opacity: 0, ease: Power3.easeInOut});
							}
							// if a hashtag is set in the copylines | (ad.currentFrame - 1) because we are counting from 0 for the frame-item-- ids
							if(myFT.instantAds["frame" + (ad.currentFrame - 1) + "_text"].indexOf("hashtag") >= 0){
								// set the hashtag-container to be visible
								TweenMax.set("#hashtag-container", {opacity: 1});
								// fade in the hashtag before frame starts
								TweenMax.from("#hashtag-container", 0.5, {top: -100, ease: Power3.easeInOut});
							}
						});
						// add label to identify frame later
						ad.timeline.add("frame_" + key + "_in");
						// stagger all childnodes in
						ad.timeline.staggerTo(document.querySelector("#frame-item--" + key).childNodes, 0.75, {opacity: 1, scale: 1, x: 0, y: 0, ease: Power3.easeInOut}, 0.10);
						// while frame function
						ad.timeline.call(function(){
							// call particle function with current frame
							if(myFT.instantAds.particles === "true"){
								ad.particleAnimation(ad.currentFrame);
							}
							// debug
							ad.debug("Frame: " + ad.currentFrame + "/" + document.querySelector("#frame-container").childNodes.length + " | " + "Cycle: " + ad.timeline._cycle);
							// when timeline reaches end
							if(cycles == ad.timeline._cycle && ad.currentFrame == document.querySelector("#frame-container").childNodes.length){
								// dispatch timelineend event
								myFT.dispatchEvent("timelineend");
								// call pause function
								ad.timeline.pause();
							}
						});
						// stagger all childnodes out
						ad.timeline.staggerTo(document.querySelector("#frame-item--" + key).childNodes, 0.75, {opacity: 0, ease: Power3.easeInOut, delay: frameDurations[key]}, 0.10);
						// add label to identify frame later
						ad.timeline.add("frame_" + key + "_out");
						// after frame function
						ad.timeline.call(function(){
							// if an image is set in the copylines | (ad.currentFrame - 1) because we are counting from 0 for the frame-item-- ids
							if(myFT.instantAds["frame" + (ad.currentFrame - 1) + "_text"].indexOf("hide-logo") >= 0){
								// fade out the DLP logo when frame ends 
								TweenMax.to("#logo", 0.3, {opacity: 1, ease: Power3.easeInOut});
							}
							// if a hashtag is set in the copylines | (ad.currentFrame - 1) because we are counting from 0 for the frame-item-- ids
							if(myFT.instantAds["frame" + (ad.currentFrame - 1) + "_text"].indexOf("hashtag") >= 0){
								// fade out the hashtag when frame ends 
								TweenMax.set("#hashtag-container", {opacity: 0});
							}
							// increase frame counter
							ad.currentFrame += 1;
						});
					}
				}
			}
			// dispatch play event when build has finished
			myFT.dispatchEvent("buildready");
		},
		vis: (function () {
		  var stateKey,
		      eventKey,
		      keys = {
		        hidden: "visibilitychange",
		        webkitHidden: "webkitvisibilitychange",
		        mozHidden: "mozvisibilitychange",
		        msHidden: "msvisibilitychange"
		      };
		  for (stateKey in keys) {
		    if (stateKey in document) {
		      eventKey = keys[stateKey];
		      break;
		    }
		  }
		  return function (c) {
		    if (c) document.addEventListener(eventKey, c);
		    return !document[stateKey];
		  }
		})()
	};
	// on buildready event start the timeline
	myFT.on("buildready", function(){
		ad.debug("Ad: DOM ready");
		ad.buildready = true;
	});
	myFT.on("backgroundcontentloaded", function(){
		ad.debug("Ad: Backgroundcontent loaded");
		if(ad.buildready){
			ad.debug("Timeline: Play");
			ad.timeline.play();
		}
	});
	// on timelineend event
	myFT.on("timelineend", function(){
		ad.debug("Timeline: End");
		ad.ended = true;
	});
	// on timelinepaused event
	myFT.on("timelinepaused", function(){
		ad.debug("Timeline: Paused, waiting for video end");
		ad.timeline.pause();
		ad.videoPlaying = true;
	});
	// wait for instant ads event to start building the dynamic content
	myFT.on("instantads", function(){
		ad.start();
	});
})(window, document);