window.addEventListener('resize', function() {
    // Get the width of the #background div
    let backgroundWidth = document.getElementById('background').offsetWidth;

    // Calculate the scale value
    let widthScaleValue = backgroundWidth / 640;

    // Calculate the top and left values
    let leftValue = (widthScaleValue * 100) + 'px';
    let topValue = (widthScaleValue * 140) + 'px'; 



    // Update the CSS variables
    document.documentElement.style.setProperty('--scale-value', widthScaleValue);
    document.documentElement.style.setProperty('--left-value', leftValue);
    document.documentElement.style.setProperty('--top-value', topValue);
});

// Call the resize function initially to set the scale on page load
window.dispatchEvent(new Event('resize'));