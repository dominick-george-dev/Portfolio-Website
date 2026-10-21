const menu = document.querySelector('.wheel-menu');

if (menu) {
    const items = menu.querySelectorAll('.item');
    const increment = 360 / items.length;
    const threshold = 80;
    let angle = 0;
    let accumulatedDeltaY = 0;

    function findOpacity(angle) {
        let newAngle;
        if (angle >= 0 && angle <= 90) {
            newAngle = angle;
        } else if (angle > 90 && angle <= 180) {
            newAngle = 180 - angle;
        } else if (angle > 180 && angle <= 270) {
            newAngle = angle - 180;
        } else {
            newAngle = 360 - angle;
        }
        return 1 - (newAngle % 90) / 90;
    }

    // Position every item around the wheel; the one at 0deg faces the viewer.
    function render() {
        let iterator = angle;
        items.forEach((item) => {
            item.style.transform = `rotateX(${iterator}deg) translateZ(120px)`;
            const opacity = findOpacity(iterator % 360);
            item.style.opacity = opacity;
            item.classList.toggle('active', opacity === 1);
            item.tabIndex = -1;
            iterator += increment;
        });
        // Only the front item is in the tab order; arrow keys turn the wheel.
        frontItem().tabIndex = 0;
    }

    function frontItem() {
        let iterator = angle;
        for (const item of items) {
            if (((iterator % 360) + 360) % 360 === 0) {
                return item;
            }
            iterator += increment;
        }
        return items[0];
    }

    function rotate(steps) {
        angle += steps * increment;
        render();
    }

    menu.addEventListener('wheel', (e) => {
        accumulatedDeltaY += e.deltaY;
        if (Math.abs(accumulatedDeltaY) >= threshold) {
            const steps = accumulatedDeltaY < 0
                ? Math.ceil(accumulatedDeltaY / threshold)
                : Math.floor(accumulatedDeltaY / threshold);
            rotate(steps);
            accumulatedDeltaY = 0;
        }
    });

    // Keyboard: arrow keys turn the wheel and keep focus on the front item.
    menu.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
            return;
        }
        e.preventDefault();
        rotate(e.key === 'ArrowDown' ? 1 : -1);
        frontItem().focus({ preventScroll: true });
    });

    render();
}
