/*
	Password Generator

	Supports generating passwords of unlimited length and selectable complexity.

	@author nrekow
	
*/


/**
 * Centers and fades in our box.
 * 
 * @returns void
 */
function centerBox() {
    $('#outer_box').position({
        my: 'center', at: 'center', of: window
    });
    $('#outer_box').fadeIn();
    return false;
}// END: centerBox();


/**
 * Resets options of form, because relying on the browsers form-reset function is not a good idea.
 *  
 * @returns false
 */
function resetOptions() {
	$('#length').val('10');
	$('#result').val('');
	$('#custom').val('');
	$('#symbols').prop('checked', false);
	$('#similar').prop('checked', false);
	$('#dashes').prop('checked', false);
	$('#mandatory').prop('checked', false);
	$('.strength').hide();
	return false;
}


/**
 * Sets random background image.
 * 
 * @returns void
 */
function randomImage() {
	var duration = 500;
	$.ajax({
		type: 'post',
		url: 'generator.php',
		data: 'ajax=1&bg=1',
		success: function(result) {
			$('#bg2').fadeOut(duration, function() {
				$('#bg2').css('background-image', 'url("' + result + '")');
				$('#bg2').fadeIn(duration, function() {
					$('#bg1').css('background-image', 'url("' + result + '")');
				});
			});
			return false;
			
		},
		error: function(xhr, status) {
			console.log('AJAX call failed with status ' + status);
			return false;
		}
	});
	return false;
}


/**
 * Request password according to user-given parameters.
 * 
 * @param s
 * @returns void
 */
function doAJAX(s) {
	// Check if a parameter has been specified and prepare for POST; fallback to an empty string.
	if (typeof(s) === 'undefined') {
		s = '';
	} else {
		s = '&' + s + '=1';
	}
	
	// Check value of #length input form field; fallback to 10 if empty or lower than 1.
	if ($('#length').val() <= 0 || $('#length').val() === '') {
		$('#length').val(10);
	}

	// Serialize our form.
	var data = $('#generator').serialize();
	
	// Send "data" against our PHP script using AJAX; expects JSON in return.
	$.ajax({
		type: 'post',
		url: 'generator.php',
		data: 'ajax=1&' + data + s,
		dataType: 'json',

		// Re-enable the button after the AJAX call has been completed.
		complete: function() {
			$('#generate').prop('disabled', false);
			return false;
		},
		
		// On success write generated password string into our #result form field
		success: function(result) {
			$('#result').val(result.password);

			// Hide strength (e.g. red, yellow, green bars) ...
			$('.strength').hide();

			// ... check if our AJAX call also returned a strength ... 
			if (typeof(result.strength) !== 'undefined' && result.strength.length > 0) {
				// ... and just show the one returned by the AJAX call.
				$('#strength-' + result.strength).show();
			}
			return false;
		},
		
		// On error write status into browser's log
		error: function(xhr, status) {
			console.log('AJAX call failed with status ' + status);
			return false;
		}
	});
	
	return false;
}//END: doAJAX()


$(function() {
	var randomBackgroundImageInterval = setInterval(function() {
		randomImage();
		return false;
	}, 5000);
	
	// Handle clicks on the Generate button
	$('#generate').click(function() {
		// Disable the button to avoid hammering.
		$('#generate').prop('disabled', true);
		doAJAX();
		return false;
	});
	
	// Handle clicks on the "Check strength" button
	$('#checkstrength').click(function() {
		doAJAX('checkstrength');
		return false;
	});
	
	// Handle clicks on the "Reset" button.
	// This button has the type "reset", which resets all form fields to their initial values, so we just need to clear the strength-meter.
	$('#reset').click(function() {
		resetOptions();
		return false;
	});
	
	// Center the box if the browser window is resized.
	$(window).resize(function () {
		centerBox();
		return false;
	});

	// Configure the box to be draggable inside the browser window, but don't allow to move it out of the viewport.
	$('#outer_box').draggable({
		containment: '#box',
		handle: '#title',
		cancel: '#inner_box'
	});
	
	// Disable text-selection of title-bar, because this is used as drag-handle
	$('#title').disableSelection();
	
	// Remove previously set options from DOM on page (re)load.
	resetOptions();
	
	// Center box upon load
	centerBox();
});