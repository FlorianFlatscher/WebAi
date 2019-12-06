new fullpage('#fullpage', {
    sectionsColor: [["#ffffff"], ["#776DB7"]],
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    onLeave: (origin, destination, direction) => {
        switch (destination.index) {
            case 2:
            break;
        }
    }
});